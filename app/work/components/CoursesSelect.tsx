"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ICourse {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  popular: boolean;
}

const courses: ICourse[] = [
  {
    id: 1,
    title: "바이브코딩 앱 개발 바이블",
    subtitle: "티끌후 나홀로 1인 앱 & 게임 개발로 수익화 시작!",
    image: "/kdc/thumb/thumbnail_kdc_1.webp",
    originalPrice: 430000,
    salePrice: 197000,
    popular: true,
  },
  {
    id: 2,
    title: "1인 앱 수익화 바이블",
    subtitle: "월급의 3배 부수입을 만드는 개인 앱 가이드",
    image: "/kdc/thumb/thumbnail_kdc_2.webp",
    originalPrice: 450000,
    salePrice: 247000,
    popular: true,
  },
  {
    id: 3,
    title: "AI 활용 앱 개발 마스터",
    subtitle: "ChatGPT로 10배 빠른 개발하기",
    image: "/kdc/thumb/thumbnail_kdc_3.webp",
    originalPrice: 380000,
    salePrice: 189000,
    popular: false,
  },
  {
    id: 4,
    title: "Flutter 완전정복",
    subtitle: "크로스플랫폼 앱 개발의 모든 것",
    image: "/kdc/thumb/thumbnail_kdc_1.webp",
    originalPrice: 420000,
    salePrice: 215000,
    popular: false,
  },
  {
    id: 5,
    title: "Firebase 실전 프로젝트",
    subtitle: "백엔드 없이 완성하는 실시간 앱",
    image: "/kdc/thumb/thumbnail_kdc_2.webp",
    originalPrice: 350000,
    salePrice: 178000,
    popular: false,
  },
  {
    id: 6,
    title: "앱스토어 출시 전략",
    subtitle: "ASO부터 마케팅까지 완벽 가이드",
    image: "/kdc/thumb/thumbnail_kdc_3.webp",
    originalPrice: 290000,
    salePrice: 145000,
    popular: false,
  },
  {
    id: 7,
    title: "React Native 심화",
    subtitle: "네이티브 모듈 개발과 최적화",
    image: "/kdc/thumb/thumbnail_kdc_1.webp",
    originalPrice: 400000,
    salePrice: 205000,
    popular: false,
  },
  {
    id: 8,
    title: "수익형 앱 디자인 시스템",
    subtitle: "UI/UX로 전환율 3배 높이기",
    image: "/kdc/thumb/thumbnail_kdc_2.webp",
    originalPrice: 320000,
    salePrice: 167000,
    popular: false,
  },
];

export default function InteractiveCourseSelector() {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  const toggleCourse = (courseId: number) => {
    setSelectedCourses((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      } else {
        if (prev.length < 2) {
          return [...prev, courseId];
        } else {
          return [...prev.slice(1), courseId];
        }
      }
    });
  };

  const totalOriginalPrice = selectedCourses.reduce((sum, id) => {
    const course = courses.find((c) => c.id === id);
    return sum + (course?.originalPrice || 0);
  }, 0);

  const totalSalePrice = selectedCourses.reduce((sum, id) => {
    const course = courses.find((c) => c.id === id);
    return sum + (course?.salePrice || 0);
  }, 0);

  const savingsAmount = totalOriginalPrice - totalSalePrice;
  const canPurchase = selectedCourses.length === 2;

  return (
    <div className="min-h-screen bg-primary-secondary-hover p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-normal px-4 py-2 text-primary-secondary">
            <span className="text-sm font-bold">
              2개 필수 선택 시 특별 할인
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-bold text-black">
            따로 구매하면 <span className="text-primary-normal">???원</span>{" "}
            손해!
          </h1>
          <p className="text-neutral-900 text-lg">
            원하는 강의 2개를 선택하고 최대 할인 혜택을 받으세요
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Course Grid */}
          <div className="lg:col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course, index) => {
                const isSelected = selectedCourses.includes(course.id);
                const isHovered = hoveredCourse === course.id;
                const selectionOrder = selectedCourses.indexOf(course.id);

                return (
                  <div
                    key={course.id}
                    onClick={() => toggleCourse(course.id)}
                    onMouseEnter={() => setHoveredCourse(course.id)}
                    onMouseLeave={() => setHoveredCourse(null)}
                    className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-br from-primary-normal to-primary-normal-hover shadow-2xl shadow-primary-normal/50"
                        : isHovered
                          ? "bg-white/50 shadow-2xl"
                          : "bg-white"
                    } border-2 ${isSelected ? "border-primary-normal" : "border-primary-normal/50"} hover:scale-102 transform`}
                  >
                    {/* Popular Badge */}
                    {course.popular && !isSelected && (
                      <div className="absolute -right-2 -top-2 rounded-full bg-primary-normal px-3 py-1 text-xs font-bold text-white shadow-lg">
                        인기
                      </div>
                    )}

                    {/* Selection Badge */}
                    {isSelected && (
                      <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-primary-normal bg-white text-lg font-bold text-primary-normal shadow-xl">
                        {selectionOrder + 1}
                      </div>
                    )}

                    {/* Course Icon */}
                    <div className="relative mb-4 mt-2 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Course Info */}
                    <h3
                      className={`mb-2 text-xl font-bold ${isSelected ? "text-white" : "text-black"}`}
                    >
                      {course.title}
                    </h3>
                    <p
                      className={`mb-4 line-clamp-2 text-sm ${isSelected ? "text-white/90" : "text-black"}`}
                    >
                      {course.subtitle}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-2">
                      <span
                        className={`text-sm line-through ${isSelected ? "text-white/60" : "text-slate-500"}`}
                      >
                        {course.originalPrice.toLocaleString()}원
                      </span>
                      <span
                        className={`text-2xl font-bold ${isSelected ? "text-white" : "text-primary-normal"}`}
                      >
                        {course.salePrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl bg-white p-8 shadow-2xl backdrop-blur-lg">
              <h2 className="mb-6 text-2xl font-bold text-black">선택 요약</h2>

              {/* Selection Status */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-black">선택한 강의</span>
                  <span
                    className={`font-bold ${canPurchase ? "text-primary-normal" : "text-gray-400"}`}
                  >
                    {selectedCourses.length} / 2
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#ddd]">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                    style={{ width: `${(selectedCourses.length / 2) * 100}%` }}
                  />
                </div>
              </div>

              {/* Selected Courses List */}
              <div className="mb-6 space-y-3">
                {selectedCourses.length === 0 ? (
                  <div className="py-8 text-center text-slate-500">
                    <p className="text-sm">강의를 2개 선택해주세요</p>
                  </div>
                ) : (
                  selectedCourses.map((courseId, index) => {
                    const course = courses.find((c) => c.id === courseId)!;
                    return (
                      <div
                        key={courseId}
                        className="rounded-lg border-2 border-primary-normal/50 bg-primary-secondary p-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-normal text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-black">
                              {course.title}
                            </p>
                            <p className="text-sm font-bold text-primary-normal">
                              {course.salePrice.toLocaleString()}원
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Price Summary */}
              <div className="mb-6 space-y-3 border-t border-slate-700 pt-6">
                <div className="flex justify-between text-slate-400">
                  <span>정가 총액</span>
                  <span className="line-through">
                    {totalOriginalPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between font-bold text-primary-normal">
                  <span>할인 금액</span>
                  <span>-{savingsAmount.toLocaleString()}원</span>
                </div>
                <div className="flex items-end justify-between border-t border-slate-700 pt-3">
                  <span className="text-lg font-bold text-white">
                    개별 구매 시
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {totalSalePrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                disabled={!canPurchase}
                className={`w-full rounded-xl py-4 text-lg font-bold shadow-lg transition-all duration-300 ${
                  canPurchase
                    ? "bg-gradient-to-r from-primary-normal to-primary-normal-hover text-white active:scale-95"
                    : "cursor-not-allowed bg-[#ddd] text-gray-400"
                } `}
              >
                {canPurchase
                  ? `구매시 ${savingsAmount.toLocaleString()}원 절약 가능!`
                  : "강의 2개를 선택해주세요"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
