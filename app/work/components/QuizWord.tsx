"use client";

import { useState } from "react";

interface Answer {
  id: number;
  text: string;
  correct: boolean;
}

const answers: Answer[] = [
  { id: 1, text: "JavaScript", correct: true },
  { id: 2, text: "정답아님2", correct: false },
  { id: 3, text: "정답아님3", correct: false },
  { id: 4, text: "정답아님4", correct: false },
];

interface QuestionItem {
  text: string;
  answers: Answer[];
}

const question: QuestionItem[] = [
  {
    text: "은 프로그래밍 언어입니다.",
    answers: answers,
  },
  {
    text: "은 내일배움카드로 수강이 가능하다.",
    answers: answers,
  },
  {
    text: "는 바로 수강 가능하다.",
    answers: answers,
  },
];

export default function QuizWord() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<Answer | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);

  const currentQuestion = question[currentIndex];
  const currentAnswers = currentQuestion.answers;
  const isLastQuestion = currentIndex === question.length - 1;

  const handleSelect = (answer: Answer) => {
    if (submitted) return;
    setSelected(answer);
  };

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected.correct) {
      setScore((prev) => prev + 20);
    }
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const handleFinalSubmit = () => {
    setIsFinalSubmitted(true);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setIsFinalSubmitted(false);
  };

  const questionText = selected ? selected.text : "?";

  if (isFinalSubmitted) {
    return (
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-2xl rounded-2xl border-4 border-primary-normal/30 bg-primary-secondary p-10 text-center">
          <p className="mb-2 text-sm font-bold tracking-wide text-primary-normal">
            퀴즈 결과
          </p>
          <p className="mb-6 text-3xl font-bold text-black">
            총 <span className="text-primary-normal">{score}</span>점
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl bg-primary-normal px-10 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200"
          >
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-2xl">
        {/* progress bar */}
        <div className="mb-10 w-full">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary-normal transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex + 1) / question.length) * 100}%`,
              }}
            />
          </div>
        </div>
        {/* Question Card */}
        <div className="relative mb-10">
          <div className="relative rounded-2xl border-4 border-primary-normal/30 bg-primary-secondary p-8">
            {/* Question template */}
            <p className="mb-4 text-sm font-bold tracking-wide text-primary-normal">
              Question
            </p>
            <p className="text-xl font-bold text-black">
              아래 중 옳은것은?
              <br />
              <br />
              <span
                className="mx-1 inline-flex min-w-[80px] items-center justify-center rounded-lg border border-primary-normal/60 bg-white px-4 py-1.5 transition-all duration-300"
                style={{
                  boxShadow: selected ? "0 0 12px rgba(255,96,0,0.35)" : "none",
                  color: submitted
                    ? selected?.correct
                      ? "#ff6600"
                      : "#EF4444"
                    : selected
                      ? "#FF6000"
                      : "#6b7280",
                }}
              >
                {questionText}
              </span>
              {currentQuestion.text}
            </p>
            {submitted && selected?.correct && (
              <p className="mt-3 text-right font-semibold text-primary-normal">
                +20점 (총 {score}점)
              </p>
            )}

            <div className="mt-6 h-px bg-white/5" />
            <p className="mt-5 text-sm text-gray-500">
              * 보기 중 하나만 선택해주세요
            </p>
          </div>
        </div>

        {/* Answer Grid — 2 per row */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          {currentAnswers.map((answer, idx) => {
            const isSelected = selected?.id === answer.id;
            const showResult = submitted;

            let borderColor = "border-primary-secondary-hover";
            let bgColor = "bg-white";
            let textColor = "text-black";

            if (showResult) {
              if (answer.correct) {
                borderColor = "border-primary-normal";
                bgColor = "bg-primary-secondary-hover";
                textColor = "text-primary-normal";
              } else if (isSelected && !answer.correct) {
                borderColor = "border-red-500";
                bgColor = "bg-gray-50";
                textColor = "text-red-300";
              }
            } else if (isSelected) {
              borderColor = "border-primary-normal";
              bgColor = "bg-primary-secondary";
              textColor = "text-primary-normal";
            }

            return (
              <button
                key={answer.id}
                onClick={() => handleSelect(answer)}
                disabled={submitted}
                type="button"
                className={`group relative flex items-center gap-3 rounded-xl border-2 px-5 py-4 text-left font-bold transition-all duration-200 ${borderColor} ${bgColor} ${textColor} ${!submitted ? "cursor-pointer hover:scale-[1.02] hover:border-primary-normal hover:bg-primary-secondary" : "cursor-default"} disabled:cursor-default`}
              >
                {/* Number badge */}
                <span className="border-current/30 flex size-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium leading-snug">
                  {answer.text}
                </span>

                {/* Check/X icon on submit */}
                {showResult && (
                  <span className="ml-auto flex-shrink-0 text-base">
                    {answer.correct ? "✓" : isSelected ? "❌" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col items-center gap-4">
          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selected}
              className={`rounded-xl ${selected ? "bg-primary-normal" : "bg-gray-300"} px-10 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200`}
            >
              제출하기
            </button>
          ) : (
            <div className="flex w-full flex-col items-center gap-4">
              <div
                className={`w-full rounded-xl py-3 text-center text-sm font-semibold uppercase tracking-widest ${
                  selected?.correct ? "text-primary-normal" : "text-red-500"
                }`}
              >
                {selected?.correct ? "🎉 정답!" : "❌ 오답!"}
              </div>
              {isLastQuestion ? (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="rounded-xl bg-primary-normal px-10 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200"
                >
                  최종 제출
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl bg-primary-normal px-10 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200"
                >
                  다음 문제
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
