"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface IExpandableButtonProps {
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

const buttons = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: "프로젝트 기획",
    badge: "Step 1",
    description:
      "프로젝트의 목표와 범위를 정의하고, 주요 이해관계자들과의 회의를 통해 요구사항을 수집합니다. 이 단계에서는 프로젝트의 성공 기준을 명확히 하고, 예상되는 리스크를 파악합니다.",
    imageSrc: "/mock/mock_iphone.png",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
        />
      </svg>
    ),
    title: "디자인 시스템 구축",
    badge: "Step 2",
    description:
      "일관된 사용자 경험을 제공하기 위한 디자인 시스템을 구축합니다. 컬러 팔레트, 타이포그래피, 컴포넌트 라이브러리를 정의하고, 디자이너와 개발자 간의 원활한 협업을 위한 가이드라인을 작성합니다. Figma 또는 Sketch를 활용하여 디자인 에셋을 관리합니다.",
    imageSrc: "/mock/mock_iphone.png",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
    title: "프론트엔드 개발",
    badge: "Step 3",
    description:
      "React 또는 Vue.js를 활용하여 사용자 인터페이스를 구현합니다. 반응형 디자인을 적용하고, 성능 최적화를 진행합니다.",
    imageSrc: "/mock/mock_iphone.png",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
        />
      </svg>
    ),
    title: "백엔드 API 개발",
    badge: "Step 4",
    description:
      "RESTful API 또는 GraphQL을 설계하고 구현합니다. 데이터베이스 스키마를 설계하고, 인증/인가 시스템을 구축합니다. 확장 가능한 아키텍처를 고려하여 마이크로서비스 패턴을 적용할 수 있습니다.",
    imageSrc: "/mock/mock_iphone.png",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
        />
      </svg>
    ),
    title: "테스트 및 배포",
    badge: "Step 5",
    description:
      "유닛 테스트, 통합 테스트, E2E 테스트를 진행하여 코드 품질을 보장합니다. CI/CD 파이프라인을 구축하고, 스테이징 환경에서 최종 검증 후 프로덕션에 배포합니다.",
    imageSrc: "/mock/mock_iphone.png",
  },
];

const ExpandableButton = ({
  icon,
  title,
  badge,
  description,
  index,
  isOpen,
  onToggle,
}: IExpandableButtonProps) => {
  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-3xl bg-black/75 backdrop-blur-xl"
      onClick={() => onToggle(index)}
      initial={{ y: -20, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : "56px",
        x: 0,
        opacity: 1,
      }}
      transition={{
        height: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
        y: { duration: 0.4, ease: [0.42, 0, 0.58, 1], delay: index * 0.1 },
        opacity: {
          duration: 0.4,
          ease: [0.42, 0, 0.58, 1],
          delay: index * 0.1,
        },
      }}
      whileHover={!isOpen ? { backgroundColor: "rgba(24, 24, 24, 0.75)" } : {}}
    >
      <div className="relative min-h-[56px] bg-white/30">
        {/* Title (Summary) */}
        <motion.div
          className="pointer-events-none absolute left-0 right-0 top-0 flex h-14 items-center gap-2 whitespace-nowrap px-6 font-semibold text-white"
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{
            opacity: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
          }}
        >
          <div className="h-6 w-6 flex-shrink-0">{icon}</div>
          <span className="font-bold">{title}</span>
          <span className="ml-2 rounded-xl bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
            {badge}
          </span>
        </motion.div>

        {/* Description (Content)*/}
        <motion.div
          className="pointer-events-none w-full px-6 py-6"
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            opacity: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
          }}
        >
          <p className="text-[15px] leading-relaxed text-white/90">
            {description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ExpandableButtonPage() {
  // const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = openIndex - 1;
    setOpenIndex(newIndex < 0 ? buttons.length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = openIndex + 1;
    setOpenIndex(newIndex > buttons.length - 1 ? 0 : newIndex);
  };

  return (
    <div className="flex h-dvh items-center justify-center gap-4 bg-black">
      {/* button */}
      {openIndex !== null && (
        <div className="flex flex-col gap-2 px-5">
          <button
            onClick={handlePrevious}
            className="rounded-lg bg-white p-2 transition-colors hover:bg-white/80"
          >
            <ArrowUp className="size-6" />
          </button>
          <button
            onClick={handleNext}
            className="rounded-lg bg-white p-2 transition-colors hover:bg-white/80"
          >
            <ArrowDown className="size-6" />
          </button>
        </div>
      )}
      <div className="flex h-full w-full max-w-2xl flex-col justify-center gap-4">
        {buttons.map((button, index) => (
          <ExpandableButton
            key={index}
            {...button}
            index={index}
            isOpen={openIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </div>
      {/* image */}
      <div className="relative h-full w-full overflow-hidden">
        {openIndex ? (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={openIndex}
                src={buttons[openIndex].imageSrc}
                alt={buttons[openIndex].title}
                initial={{ opacity: 0, x: "20%", scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 0, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "linear",
                }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </>
        ) : (
          <>
            <img
              src={buttons[0].imageSrc}
              alt={buttons[0].title}
              className="h-full w-full object-cover"
            />
          </>
        )}
      </div>
    </div>
  );
}
