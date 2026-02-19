"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Apple, Brain, GraduationCap, Info } from "lucide-react";

const optionList = [
  {
    id: "grades",
    icon: Apple,
    label: "Grades 2 through 12",
    iconColor: "text-red-500",
  },
  {
    id: "university",
    icon: GraduationCap,
    label: "University",
    iconColor: "text-gray-800",
  },
  {
    id: "adult",
    icon: Brain,
    label: "I'm an adult learner",
    iconColor: "text-pink-500",
  },
] as const;

const questions = [
  {
    id: "grades",
    question: "Where are you in your math studies?",
    options: optionList,
  },
  {
    id: "university",
    question: "What is your main goal?",
    options: optionList,
  },
  {
    id: "adult",
    question: "How much time can you spend per week?",
    options: optionList,
  },
] as const;

const TypingText = ({
  text,
  speed = 25,
  onComplete,
  enabled = true,
}: {
  text: string;
  speed?: number;
  onComplete?: (isComplete: true) => void;
  enabled?: boolean;
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    if (!enabled) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  if (!enabled) return "";
  return displayed;
};

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [incorrectOptionId, setIncorrectOptionId] = useState<string | null>(
    null,
  );
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isInnerAnimationDone, setIsInnerAnimationDone] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length;
  const TMP = "adult";

  const handleNext = () => {
    if (isLastQuestion) return;
    if (TMP === selectedId) {
      setIncorrectOptionId(selectedId);
      return;
    }
    setIncorrectOptionId(null);
    setCurrentIndex((i) => i + 1);
    setSelectedId(null);
    setIsTypingComplete(false);
  };

  if (!currentQuestion)
    return (
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="bg-gray-200 p-4 text-center text-2xl font-bold">
          퀴즈 완료
        </h1>
      </div>
    );

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* animation intro */}
      <AnimatePresence
        onExitComplete={() => setIsAnimationDone(true)}
        mode="wait"
      >
        {!isExiting && (
          <div className="fixed left-0 top-0 z-[10] h-full w-full bg-black">
            <motion.div
              layoutId="lion"
              className="fixed left-1/2 top-1/2 z-[10] flex size-[25vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-normal shadow-md"
              exit={{ scale: 1, backgroundColor: "bg-white" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center justify-center gap-10">
                <img
                  src="/mock/career_question_lion.webp"
                  alt=""
                  className="size-full"
                />
                <p className="text-center text-sm text-white">
                  <TypingText text={"문제를 문제를 문제를 풀어보세요!"} />
                </p>
                <button
                  type="button"
                  onClick={() => setIsExiting(true)}
                  className="mt-5 rounded-lg bg-primary-secondary-hover px-4 py-2 font-bold text-black transition-opacity disabled:opacity-50"
                >
                  퀴즈 풀기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* detail info */}
      <article>
        <button
          className="absolute right-0 top-0 flex items-center gap-2"
          type="button"
          onClick={() => setIsGuideOpen(true)}
        >
          <Info size={20} />
          <span>설명</span>
        </button>
        {isGuideOpen && (
          <div
            className="fixed left-0 top-0 z-[1] h-full w-full bg-black/30"
            onClick={() => setIsGuideOpen(false)}
            role="presentation"
            aria-hidden="true"
          >
            <ul
              className="fixed left-1/2 top-1/2 z-[10] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gray-200 p-4 font-bold"
              onClick={(e) => e.stopPropagation()}
            >
              <li>1. 문제 타이핑 효과</li>
              <li>2. Framer Motion 애니메이션</li>
              <li>3. 오답 선택시(임시 오답 3번), 마이크로 애니메이션</li>
            </ul>
          </div>
        )}
      </article>

      <div className="flex w-full flex-col gap-8 sm:items-start sm:gap-10">
        {/* Character + Question */}
        <div className="flex shrink-0 items-start gap-0">
          <div className="relative flex size-24 shrink-0 items-center justify-center sm:size-28">
            {isAnimationDone ? (
              <motion.div
                layoutId="lion"
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex size-20 flex-col items-center justify-center rounded-full bg-primary-normal shadow-md sm:size-24"
                onLayoutAnimationComplete={() => setIsInnerAnimationDone(true)}
              >
                <img
                  src="/mock/career_question_lion.webp"
                  alt=""
                  className="size-full"
                />
              </motion.div>
            ) : (
              <div className="flex size-20 flex-col items-center justify-center rounded-full bg-primary-normal shadow-md sm:size-24">
                <img
                  src="/mock/career_question_lion.webp"
                  alt=""
                  className="size-full"
                />
              </div>
            )}
          </div>
          {/* Question */}
          {isInnerAnimationDone && (
            <div className="relative ml-2 mt-10 min-h-11 w-[240px] rounded-2xl rounded-tl-sm bg-gray-200 px-4 py-3 sm:w-[280px]">
              <p className="text-sm font-medium text-gray-900 sm:text-base">
                <TypingText
                  text={currentQuestion.question}
                  enabled={isAnimationDone}
                  onComplete={() => setIsTypingComplete(true)}
                />
              </p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="ml-auto flex w-full flex-col gap-3 sm:max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedId === option.id;
                const isIncorrect = option.id === incorrectOptionId;
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(option.id);
                      setIncorrectOptionId(null);
                    }}
                    initial={{ opacity: 0, y: 12, x: 0 }}
                    animate={
                      isTypingComplete
                        ? {
                            opacity: 1,
                            y: 0,
                            x: isIncorrect
                              ? [0, -10, 10, -10, 10, -6, 6, 0]
                              : 0,
                          }
                        : { opacity: 0, y: 12, x: 0 }
                    }
                    transition={{
                      opacity: {
                        duration: 0.3,
                        delay: isTypingComplete ? 0.3 : 0,
                      },
                      y: {
                        duration: 0.3,
                        delay: isTypingComplete ? 0.3 : 0,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      x: {
                        duration: 0.5,
                        ease: "easeInOut",
                      },
                    }}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                      isIncorrect
                        ? "border-red-500 bg-red-50"
                        : isSelected
                          ? "border-primary-normal bg-primary-secondary text-primary-normal"
                          : "border-gray-200 bg-white text-gray-900 hover:border-primary-secondary-hover"
                    }`}
                  >
                    <span
                      className={`shrink-0 ${isSelected ? "text-primary-normal" : option.iconColor}`}
                    >
                      <Icon className="size-6 sm:size-7" strokeWidth={2} />
                    </span>
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="mt-10 flex items-center justify-end gap-4 border-t pt-10">
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {questions.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedId}
          className="rounded-lg bg-primary-normal px-4 py-2 font-bold text-white transition-opacity disabled:opacity-50"
        >
          {isLastQuestion ? "제출" : "다음"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
