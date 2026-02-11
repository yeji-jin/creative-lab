"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  icon: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: "Card 1",
    subtitle: "Card 1",
    bgColor: "from-blue-400 to-blue-600",
    icon: "🤖",
  },
  {
    id: 2,
    title: "Card 2",
    subtitle: "Card 2",
    bgColor: "from-cyan-400 to-blue-500",
    icon: "✍️",
  },
  {
    id: 3,
    title: "Card 3",
    subtitle: "Card 3",
    bgColor: "from-yellow-300 to-yellow-500",
    icon: "👤",
  },
  {
    id: 4,
    title: "Card 4",
    subtitle: "Card 4",
    bgColor: "from-pink-300 to-pink-500",
    icon: "🎨",
  },
  {
    id: 5,
    title: "Card 5",
    subtitle: "Card 5",
    bgColor: "from-yellow-200 to-yellow-400",
    icon: "🎙️",
  },
  {
    id: 6,
    title: "Card 6",
    subtitle: "Card 6",
    bgColor: "from-purple-400 to-pink-500",
    icon: "⏰",
  },
  {
    id: 7,
    title: "Card 7",
    subtitle: "Card 7",
    bgColor: "from-cyan-300 to-blue-400",
    icon: "☁️",
  },
];

export default function Coverflow() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-purple-200 p-10">
      {/* Card */}
      <div
        className="mx-auto flex max-w-7xl items-center justify-center"
        style={{ marginLeft: `${(cards.length - 1) * 60}px` }}
      >
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          const baseOffset = index * -60;

          let extraOffset = 0;
          if (hoveredIndex !== null) {
            if (index < hoveredIndex) extraOffset = -60;
            if (index > hoveredIndex) extraOffset = 60;
          }

          return (
            <motion.div
              key={card.id}
              initial={false}
              onClick={() => setSelectedCard(card)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                x: baseOffset + extraOffset,
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
                className={`relative flex h-64 w-48 flex-col items-center justify-between rounded-2xl bg-gradient-to-br ${card.bgColor} p-6 text-white ${
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
      {/* 모달 */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* 배경 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            />

            {/* 모달 컨테이너 */}
            <div
              className="fixed inset-0 z-[999] flex items-center justify-center p-4"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 20,
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${selectedCard.bgColor} p-10 shadow-2xl`}
                >
                  {/* 닫기 버튼 */}
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white/30"
                  >
                    X
                  </button>

                  {/* Glow */}
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

                  {/* 내용 */}
                  <div className="relative z-10 text-center text-white">
                    <div className="mb-6 text-7xl">{selectedCard.icon}</div>

                    <h2 className="mb-4 text-4xl font-bold">
                      {selectedCard.title}
                    </h2>

                    <p className="mb-8 text-xl opacity-90">
                      {selectedCard.subtitle}
                    </p>

                    <div className="mt-8 space-y-4">
                      <p className="opacity-80">
                        이 기능을 사용하여 작업을 시작하세요. 다양한 AI 도구와
                        기능을 활용할 수 있습니다.
                      </p>

                      <div className="mt-6 flex justify-center gap-4">
                        <button className="rounded-full bg-white px-8 py-3 font-semibold text-gray-800 hover:bg-gray-100">
                          시작하기
                        </button>
                        <button className="rounded-full bg-white/20 px-8 py-3 font-semibold text-white hover:bg-white/30">
                          더 알아보기
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
