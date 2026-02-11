"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus } from "lucide-react";

interface Card {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  icon: string;
  package: {
    title: string;
    image: string;
    subtitle: string;
    price: number;
  }[];
}

const cards: Card[] = [
  {
    id: 1,
    title: "AI",
    subtitle: "AI",
    bgColor: "from-blue-400 to-blue-600",
    icon: "🤖",
    package: [
      {
        title: "AI 기초 강의",
        subtitle: "AI에 대해 알고싶다면? 이 강의를 추천합니다.",
        image: "/kdc/thumb/thumbnail_kdc_1.webp",
        price: 100000,
      },
      {
        title: "AI 심화 강의",
        subtitle: "AI를 활용한 실제 프로젝트까지. 실전 중심 학습.",
        image: "/kdc/thumb/thumbnail_kdc_2.webp",
        price: 150000,
      },
    ],
  },
  {
    id: 2,
    title: "Front",
    subtitle: "Front",
    bgColor: "from-cyan-400 to-blue-500",
    icon: "✍️",
    package: [
      {
        title: "프론트엔드 입문",
        subtitle: "HTML, CSS, JavaScript 기초부터 차근차근.",
        image: "/kdc/thumb/thumbnail_kdc_1.webp",
        price: 120000,
      },
      {
        title: "React 완전정복",
        subtitle: "모던 프론트엔드 개발의 핵심, React를 마스터하세요.",
        image: "/kdc/thumb/thumbnail_kdc_2.webp",
        price: 180000,
      },
    ],
  },
  {
    id: 3,
    title: "Back",
    subtitle: "Back",
    bgColor: "from-yellow-300 to-yellow-500",
    icon: "👤",
    package: [
      {
        title: "백엔드 기초",
        subtitle: "서버 개발의 첫걸음. Node.js와 Express로 시작하세요.",
        image: "/kdc/thumb/thumbnail_kdc_1.webp",
        price: 130000,
      },
      {
        title: "데이터베이스 설계",
        subtitle: "MySQL, MongoDB를 활용한 데이터 모델링.",
        image: "/kdc/thumb/thumbnail_kdc_2.webp",
        price: 140000,
      },
    ],
  },
  {
    id: 4,
    title: "App",
    subtitle: "App",
    bgColor: "from-pink-300 to-pink-500",
    icon: "🎨",
    package: [
      {
        title: "앱 개발 입문",
        subtitle: "Flutter로 크로스플랫폼 앱을 만들어보세요.",
        image: "/kdc/thumb/thumbnail_kdc_1.webp",
        price: 160000,
      },
      {
        title: "앱 출시 실전",
        subtitle: "스토어 등록부터 ASO까지. 실제 앱 배포 경험.",
        image: "/kdc/thumb/thumbnail_kdc_2.webp",
        price: 200000,
      },
    ],
  },
  {
    id: 5,
    title: "Design",
    subtitle: "Design",
    bgColor: "from-yellow-200 to-yellow-400",
    icon: "🎙️",
    package: [
      {
        title: "UI/UX 기초",
        subtitle: "사용자를 위한 디자인. 피그마로 프로토타입 만들기.",
        image: "/kdc/thumb/thumbnail_kdc_1.webp",
        price: 110000,
      },
      {
        title: "디자인 시스템",
        subtitle: "재사용 가능한 컴포넌트 기반 디자인.",
        image: "/kdc/thumb/thumbnail_kdc_2.webp",
        price: 170000,
      },
    ],
  },
  {
    id: 6,
    title: "PM",
    subtitle: "PM",
    bgColor: "from-purple-400 to-pink-500",
    icon: "⏰",
    package: [
      {
        title: "PM 기초",
        subtitle: "프로젝트 관리와 애자일 방법론의 이해.",
        image: "/kdc/thumb/thumbnail_kdc_1.webp",
        price: 90000,
      },
      {
        title: "프로덕트 기획",
        subtitle: "사용자 리서치부터 로드맵 수립까지.",
        image: "/kdc/thumb/thumbnail_kdc_2.webp",
        price: 190000,
      },
    ],
  },
  {
    id: 7,
    title: "Marketing",
    subtitle: "Marketing",
    bgColor: "from-cyan-300 to-blue-400",
    icon: "☁️",
    package: [
      {
        title: "마케팅 입문",
        subtitle: "마케팅의 기본 개념과 디지털 마케팅 전략.",
        image: "/kdc/thumb/thumbnail_kdc_1.webp",
        price: 95000,
      },
      {
        title: "Growth 마케팅",
        subtitle: "데이터 기반 성장 전략과 유입 최적화.",
        image: "/kdc/thumb/thumbnail_kdc_2.webp",
        price: 175000,
      },
    ],
  },
];
const cardHoverGap = 40;

export default function CoverflowDetail() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-primary-normal/20 p-10">
      <div className="mb-20 flex flex-col items-center justify-center gap-4">
        <h5 className="rounded-full bg-primary-normal px-4 py-2 text-xl font-bold text-white">
          RECOMMEND
        </h5>
        <h3 className="text-4xl font-bold">누구나 쉽게 시작하는 입문 강의</h3>
      </div>
      {/* Card */}
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6">
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          let extraOffset = 0;
          if (hoveredIndex !== null) {
            if (index < hoveredIndex) extraOffset = -cardHoverGap;
            if (index > hoveredIndex) extraOffset = cardHoverGap;
          }

          return (
            <motion.div
              key={card.id}
              initial={false}
              onClick={() => {
                if (selectedCard?.id === card.id) {
                  setSelectedCard(null);
                } else if (selectedCard) {
                  setSelectedCard(null);
                  setTimeout(() => setSelectedCard(card), 150);
                } else {
                  setSelectedCard(card);
                }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                x: extraOffset,
                scale: isHovered ? 1.2 : 1,
                y: isHovered ? -20 : 0,
                zIndex: isHovered ? 200 : 100 - index,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 20,
              }}
              className="relative cursor-pointer"
            >
              <div
                className={`relative flex size-32 flex-col items-center justify-between rounded-2xl bg-gradient-to-br ${card.bgColor} p-6 text-white ${
                  isHovered
                    ? "shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
                    : "shadow-xl"
                }`}
              >
                {/* Glow */}
                <div className="absolute right-2 top-2 h-12 w-12 rounded-full bg-white/20 blur-xl" />
                <div className="absolute bottom-2 left-2 h-16 w-16 rounded-full bg-white/10 blur-2xl" />

                <div className="text-4xl">{card.icon}</div>

                <div className="text-center">
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p className="text-sm opacity-90">{card.subtitle}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail */}
      <div className="mx-auto mt-20 w-full max-w-4xl px-4">
        <AnimatePresence mode="wait">
          {selectedCard ? (
            <>
              <div className="flex gap-5">
                {/* 왼쪽 → 오른쪽 (package[0]) */}
                <motion.div
                  key={`${selectedCard.id}-left`}
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative flex flex-1 flex-col items-center justify-center rounded-3xl bg-primary-secondary p-8 text-center text-white"
                >
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-2xl font-bold">
                      {selectedCard.package[0]?.title ?? selectedCard.title}
                    </h3>
                    <p className="opacity-80">
                      {selectedCard.package[0]?.subtitle}
                    </p>
                    <div className="overflow-hidden rounded-lg">
                      <img src={selectedCard.package[0]?.image} alt="" />
                    </div>
                    <p className="text-xl font-bold text-primary-normal">
                      {selectedCard.package[0]?.price != null
                        ? `${selectedCard.package[0].price.toLocaleString()}원`
                        : ""}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <button className="rounded-full bg-primary-normal px-8 py-3 font-semibold text-white hover:bg-primary-normal-hover">
                        강의 내용 보기
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* 오른쪽 → 왼쪽 (package[1]) */}
                <motion.div
                  key={`${selectedCard.id}-right`}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative flex flex-1 flex-col items-center justify-center rounded-3xl bg-white p-8"
                >
                  <span className="absolute -left-8 top-1/2 z-10 -translate-y-1/2">
                    <CirclePlus className="p- size-10 rounded-full bg-gradient-to-br p-1 text-black shadow-lg" />
                  </span>
                  <div className="space-y-4 text-center text-gray-700">
                    <h3 className="text-2xl font-bold">
                      {selectedCard.package[1]?.title ?? selectedCard.title}
                    </h3>
                    <p className="opacity-80">
                      {selectedCard.package[1]?.subtitle}
                    </p>
                    <div className="overflow-hidden rounded-lg">
                      <img src={selectedCard.package[1]?.image} alt="" />
                    </div>
                    <p className="text-xl font-bold text-primary-normal">
                      {selectedCard.package[1]?.price != null
                        ? `${selectedCard.package[1].price.toLocaleString()}원`
                        : ""}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <button className="rounded-full border-2 border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:bg-gray-100">
                        강의 내용 보기
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10 text-center text-2xl font-bold text-primary-normal">
                <p className="mb-3 text-sm text-black">
                  따로 구매하면{" "}
                  {selectedCard.package[1]?.price.toLocaleString()}원 손해!
                </p>
                패키지 특가{" "}
                <span className="rounded-full text-4xl font-bold">
                  {(
                    selectedCard.package[0]?.price +
                    selectedCard.package[1]?.price
                  ).toLocaleString()}
                  원
                </span>
              </div>
            </>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white/50 p-10"
            >
              <span className="mb-2 text-5xl opacity-50">👆</span>
              <p className="text-xl font-medium text-gray-500">
                카드를 선택해주세요
              </p>
              <p className="mt-1 text-sm text-gray-400">
                위의 카드를 클릭하면 상세 정보를 확인할 수 있습니다
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
