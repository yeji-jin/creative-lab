"use client";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Home, Pencil, Settings, User, LogOut, X, Smile } from "lucide-react";

const FloatingMenu = () => {
  const items = [
    { icon: <Home className="size-5" />, label: "홈" },
    { icon: <Pencil className="size-5" />, label: "편집" },
    { icon: <Settings className="size-5" />, label: "설정" },
    { icon: <User className="size-5" />, label: "프로필" },
    { icon: <LogOut className="size-5" />, label: "로그아웃" },
  ];

  // 반원 형태 (200deg ~ 340deg 범위에 5개 배치)
  const START_ANGLE = 200; // deg
  const END_ANGLE = 340; // deg
  const RADIUS = 90; // px

  function getPosition(index: number, total: number) {
    const angle =
      START_ANGLE + (index / (total - 1)) * (END_ANGLE - START_ANGLE);
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * RADIUS,
      y: Math.sin(rad) * RADIUS,
    };
  }

  const itemVariants = (index: number, total: number): Variants => {
    const { x, y } = getPosition(index, total);
    return {
      open: {
        x,
        y,
        opacity: 1,
        scale: 1,
        transition: {
          delay: index * 0.05,
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      closed: {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.3,
        transition: {
          delay: (total - index) * 0.03,
          duration: 0.3,
          ease: [0.55, 0, 1, 0.45],
        },
      },
    };
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="relative flex items-center justify-center">
        {items.map((item, index) => (
          <motion.button
            key={index}
            className="absolute flex size-10 items-center justify-center rounded-full bg-primary-normal text-white shadow-md"
            variants={itemVariants(index, items.length)}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={item.label}
          >
            {item.icon}
          </motion.button>
        ))}

        {/* 메인 토글 버튼 */}
        <motion.button
          className="relative z-10 flex size-16 items-center justify-center rounded-full border border-primary-normal bg-white text-primary-normal shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <X className="size-6" />
          </motion.div>
        </motion.button>
      </section>
    </>
  );
};

const FloatingWideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const itemVariants = (x: string): Variants => ({
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
    closed: {
      x,
      opacity: 0,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <section>
      {/* Toggle UI */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <span
          className={`text-sm transition-colors ${!isOpen ? "font-medium text-gray-900" : "text-gray-400"}`}
        >
          접힘
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-2 ${isOpen ? "bg-primary-normal" : "bg-gray-200"}`}
        >
          <span
            className={`pointer-events-none mt-0.5 inline-block h-6 w-6 shrink-0 rounded-full bg-white shadow-sm transition-transform ${isOpen ? "translate-x-6" : "translate-x-0.5"}`}
          />
        </button>
        <span
          className={`text-sm transition-colors ${isOpen ? "font-medium text-gray-900" : "text-gray-400"}`}
        >
          펼침
        </span>
      </div>

      <div className="flex items-center justify-center gap-5">
        <motion.button
          className="flex size-12 items-center justify-center rounded-full bg-primary-normal"
          variants={itemVariants("200%")}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Smile className="size-6 text-white" />
        </motion.button>

        <motion.button
          className="flex size-12 items-center justify-center rounded-full bg-primary-normal"
          variants={itemVariants("100%")}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Smile className="size-6 text-white" />
        </motion.button>

        {/* 메인 버튼 */}
        <motion.button
          className="flex size-16 items-center justify-center rounded-full bg-primary-normal"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Smile className="size-6 text-white" />
        </motion.button>

        <motion.button
          className="flex size-12 items-center justify-center rounded-full bg-primary-normal"
          variants={itemVariants("-100%")}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Smile className="size-6 text-white" />
        </motion.button>

        <motion.button
          className="flex size-12 items-center justify-center rounded-full bg-primary-normal"
          variants={itemVariants("-200%")}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Smile className="size-6 text-white" />
        </motion.button>
      </div>
    </section>
  );
};

const Floating = () => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-gray-200 px-4 py-20 sm:px-6 lg:px-8">
      <FloatingMenu />
      <FloatingWideMenu />
    </div>
  );
};

export default Floating;
