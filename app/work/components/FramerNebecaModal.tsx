"use client";
import { animated, useSprings } from "@react-spring/web";
import { AnimatePresence, LayoutGroup, motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import CardApplication from "./CardApplication";

const nebecaTabList = [
  {
    id: "apply",
    label: "신청방법",
    component: <CardApplication />,
  },
  {
    id: "issued",
    label: "발급꿀팁",
    component: <CardApplication />,
  },
  {
    id: "subject",
    label: "발급대상자",
    component: <CardApplication />,
  },
  {
    id: "incentive",
    label: "훈련장려금",
    component: <CardApplication />,
  },
];

const DropItem = () => {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(dropRef, { once: true, amount: 0.25 });

  const items = [
    {
      text: "어떻게 ?",
      className:
        "w-fit text-2xl font-bold py-8 px-20 bg-[#ff6600] rounded-3xl text-white rotate-[8deg]",
    },
    {
      text: "신청하면 ?",
      className:
        "w-fit text-2xl font-bold py-8 px-20 bg-[#ffd0b2] rounded-3xl text-normal rotate-[-8deg] shadow-md",
    },
    {
      text: "되나요 ?",
      className:
        "w-fit text-2xl font-bold py-8 px-20 bg-[#ff6600] rounded-3xl text-normal rotate-[8deg]",
    },
  ];

  const [springs, api] = useSprings(items.length, () => ({
    opacity: 0,
    y: -140,
    scale: 0.7,
    immediate: true, // ✅ 화면에 보이기 전에는 고정(애니메이션 X)
  }));

  useEffect(() => {
    if (!isInView) return;

    api.start((idx) => ({
      from: { opacity: 0, y: -140, scale: 0.7 },
      to: async (next: any) => {
        await next({ opacity: 1, y: 22, scale: 1.12 });
        await next({ y: 0, scale: 1 });
      },
      delay: 500 + idx * 180,
      immediate: false,
      config: {
        tension: 420, // 탄성
        friction: 10, // 감쇠
        mass: 0.8, // 튕김
      },
    }));
  }, [api, isInView]);

  return (
    <div
      ref={dropRef}
      className="flex flex-col items-center justify-center gap-3"
    >
      {springs.map((style, idx) => (
        <animated.div
          key={items[idx].text}
          style={{
            opacity: style.opacity,
            transform: style.y.to(
              (y: number) =>
                `translate3d(0, ${y}px, 0) rotate(${(idx % 2 === 0 ? 1 : -1) * 8}deg)`,
            ),
            scale: style.scale,
          }}
          className={items[idx].className}
        >
          {items[idx].text}
        </animated.div>
      ))}
    </div>
  );
};

const NebecaModal = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedTab = useMemo(
    () => nebecaTabList.find((t) => t.id === selectedId) ?? null,
    [selectedId],
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    const prevOverflow = document.body.style.overflow;

    if (selectedTab) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflow;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedTab]);

  return (
    <div className="bg-[#fff3eb] p-20">
      <section className="p-20">
        <DropItem />
      </section>
      <LayoutGroup>
        {/* LIST */}
        <div className="mx-auto grid max-w-[720px] grid-cols-2 gap-4">
          {nebecaTabList.map((tab) => (
            <motion.div
              key={tab.id}
              layoutId={`nebeca-tab-${tab.id}`}
              onClick={() => setSelectedId(tab.id)}
              className="h-[270px] cursor-pointer rounded-3xl bg-white p-4 text-center text-2xl font-bold shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{
                layout: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
              }}
            >
              <h5 className="mb-4 border-b border-gray-200 pb-4 text-left text-2xl font-bold">
                {tab.label}
              </h5>
              <img
                src="https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-backendj-21th/section12_img6.png"
                alt=""
                className="rounded-lg"
              />
            </motion.div>
          ))}
        </div>

        {/* POPUP */}
        <AnimatePresence>
          {selectedTab && (
            <>
              {/* ① Backdrop (depth) */}
              <motion.div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedId(null)}
              />

              <motion.div
                className="fixed left-1/2 top-1/2 z-50 max-h-[70vh] w-[min(720px,92vw)]"
                style={{ translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ② layoutId + radius morph */}
                <motion.div
                  layoutId={`nebeca-tab-${selectedTab.id}`}
                  className="relative flex max-h-[70vh] flex-col overflow-hidden bg-white p-6 shadow-2xl"
                  initial={{ borderRadius: 12 }}
                  animate={{ borderRadius: 24 }}
                  transition={{
                    layout: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
                  }}
                >
                  {/* Header (빠르게) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedTab.label}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200"
                    >
                      닫기
                    </button>
                  </motion.div>

                  {/* ③ Content (늦게 등장) */}
                  <motion.div
                    className="mt-4 min-h-0 flex-1 overflow-y-auto text-gray-700"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.18,
                      duration: 0.35,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    {selectedTab.component}
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default NebecaModal;
