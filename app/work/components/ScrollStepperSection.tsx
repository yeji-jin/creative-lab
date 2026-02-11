"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const steps = [
  {
    id: 0,
    label: "지원 안내",
    content: {
      title: "📝 지원 및 선발 안내",
      items: [
        {
          icon: "📅",
          label: "모집 기간",
          value: "2026.01.29 (목) 오후 2시 ~ 2026.03.08 (일) 오후 11시",
        },
        {
          icon: "✅",
          label: "합격자 발표일",
          value: "지원서 제출 후 7일 이내 결과 안내 (영업일 기준)",
        },
      ],
    },
  },
  {
    id: 1,
    label: "교육 일정",
    content: {
      title: "교육 일정 안내",
      items: [
        { icon: "🎉", label: "OT&개강", value: "2026.03.10 (화)" },
        {
          icon: "📚",
          label: "교육 기간",
          value: "2026.03.10 (화) ~ 2026.07.01 (수)",
        },
        {
          icon: "⏰",
          label: "교육 시간",
          value: "60시간 / 평일 9시 ~ 18시 (점심시간 12시 ~ 13시 제외)",
        },
        { icon: "💻", label: "학습 형태", value: "실시간 온라인 교육" },
      ],
    },
  },
  {
    id: 2,
    label: "수료 후",
    content: {
      title: "수료 후 진로",
      items: [
        {
          icon: "🏆",
          label: "수료증 발급",
          value: "교육 수료 후 정식 수료증이 발급됩니다",
        },
        {
          icon: "💼",
          label: "취업 지원",
          value: "우수 수료생 대상 채용 연계 프로그램을 운영합니다",
        },
      ],
    },
  },
];

const SCROLL_THRESHOLD = 400;

const ScrollStepperSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("200vh");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isManualStepChange = useRef(false);

  useEffect(() => {
    setSectionHeight(
      `${100 + ((SCROLL_THRESHOLD * steps.length) / window.innerHeight) * 100}vh`,
    );
  }, []);

  const handleStepClick = (index: number) => {
    if (!sectionRef.current) return;

    isManualStepChange.current = true;
    setCurrentStep(index);

    // 해당 단계에 맞는 스크롤 위치로 이동
    const rect = sectionRef.current.getBoundingClientRect();
    const targetScroll = index * SCROLL_THRESHOLD;
    const scrollPosition = rect.top + window.scrollY + targetScroll;

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });

    // 스크롤 완료 후 플래그 리셋
    setTimeout(() => {
      isManualStepChange.current = false;
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      if (isManualStepChange.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);

      if (rect.top <= 0 && rect.bottom > window.innerHeight) {
        const newStep = Math.min(
          Math.floor(scrolled / SCROLL_THRESHOLD),
          steps.length - 1,
        );
        setCurrentStep(newStep);
      } else if (rect.top > 0) {
        setCurrentStep(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative"
    >
      <div className="sticky top-0 h-screen bg-zinc-900 transition-opacity duration-300">
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* 왼쪽: Stepper */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12 text-4xl font-bold text-white"
                >
                  지원부터 교육까지
                </motion.h2>

                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative cursor-pointer"
                        onClick={() => handleStepClick(index)}
                      >
                        <div className="flex items-center gap-4">
                          {/* Circle */}
                          <div
                            className={`relative z-[1] flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                              isActive || isCompleted
                                ? "scale-110 bg-gradient-to-br from-[#ff6000] to-orange-300 shadow-lg shadow-orange-400/50"
                                : "scale-100 bg-gray-700"
                            } `}
                          >
                            {isCompleted ? (
                              <BadgeCheck className="h-7 w-7 text-white" />
                            ) : (
                              <span className="text-xl font-bold text-white">
                                {index + 1}
                              </span>
                            )}
                          </div>

                          {/* Label */}
                          <div>
                            <div
                              className={`text-lg font-semibold transition-all duration-300 ${isActive ? "text-xl font-bold text-primary-normal" : isCompleted ? "text-white/50" : "text-white"} `}
                            >
                              {step.label}
                            </div>
                            {isActive && (
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                className="mt-1 h-0.5 bg-gradient-to-r from-[#ff6000] to-orange-300"
                              />
                            )}
                          </div>
                        </div>

                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                          <div className="absolute left-7 top-14 h-8 w-0.5 -translate-x-1/2">
                            <div
                              className={`h-full w-full transition-all duration-500 ${
                                index < currentStep
                                  ? "bg-gradient-to-b from-[#ff6000] to-orange-300"
                                  : "bg-gray-700"
                              }`}
                            />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="relative mt-12">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#ff6000] to-orange-300"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  {/* image */}
                  <div
                    className="absolute top-0 size-16 -translate-y-1/2"
                    style={{
                      left: `calc(${((currentStep + 1) / steps.length) * 100}% - 1.5rem)`,
                    }}
                  >
                    <img
                      src="/mock/mock_run.png"
                      alt="stepper2"
                      className="h-full w-full scale-x-[-1] transform object-cover"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-gray-400">
                    {currentStep + 1} / {steps.length}
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽: 컨텐츠 */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl border border-slate-700/50 bg-primary-secondary-hover p-8 backdrop-blur-sm"
                  >
                    <h3 className="mb-8 text-3xl font-bold text-normal">
                      {steps[currentStep].content.title}
                    </h3>

                    <div
                      className={
                        steps[currentStep].content.items.length >= 4
                          ? "grid grid-cols-2 gap-4"
                          : "space-y-4"
                      }
                    >
                      {steps[currentStep].content.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex flex-col items-start gap-4 rounded-2xl bg-white p-5 transition-all"
                        >
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6000] to-orange-300 text-2xl">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-2 text-lg font-bold text-normal">
                              {item.label}
                            </h4>
                            <p className="leading-relaxed text-normal">
                              {item.value}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollStepperSection;
