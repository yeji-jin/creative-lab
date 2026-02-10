"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    id: 1,
    title: "타이틀1타이틀1",
    description: "설명1설명1설명1설명1\n설명1설명1설명1설명1",
    footer: "*뭔지 모르지만 주의하세요",
    image:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-growth-4th/section10_img1.png",
    productName: "STEP1",
    productDesc: "내일배움카드 발급받기 내일배움카드 발급받기",
  },
  {
    id: 2,
    title: "타이틀2타이틀2",
    description: "설명1설명1설명1설명1\n설명1설명1설명1설명1",
    footer: "*뭔지 모르지만 주의하세요",
    image:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-growth-4th/section10_img2.png",
    productName: "STEP2",
    productDesc: "내일배움카드 발급받기 내일배움카드 발급받기",
  },
  {
    id: 3,
    title: "타이틀3타이틀3",
    description: "설명1설명1설명1설명1\n설명1설명1설명1설명1",
    footer: "*뭔지 모르지만 주의하세요",
    image:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-growth-4th/section10_img3.png",
    productName: "STEP3",
    productDesc: "내일배움카드 발급받기 내일배움카드 발급받기",
  },
  {
    id: 4,
    title: "타이틀4타이틀4",
    description: "설명1설명1설명1설명1\n설명1설명1설명1설명1",
    footer: "*뭔지 모르지만 주의하세요",
    image:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-growth-4th/section10_img4.png",
    productName: "STEP4",
    productDesc: "내일배움카드 발급받기 내일배움카드 발급받기",
  },
];
export default function StickyImageScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;

      // 각 섹션의 뷰포트 내 위치를 계산하여 중앙에 가장 가까운 섹션 찾기
      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          // 섹션이 뷰포트에 보이고, 중앙에 더 가까운 경우
          if (
            rect.top < windowHeight &&
            rect.bottom > 0 &&
            distance < closestDistance
          ) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black">
      {/* 메인 컨텐츠 영역 */}
      <div className="relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* 왼쪽: 일반적으로 스크롤되는 텍스트 섹션들 */}
            <div className="py-20">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => {
                    sectionsRef.current[index] = el;
                  }}
                  className="flex min-h-screen flex-col justify-center"
                >
                  <div
                    className={`transition-all duration-700 ${
                      activeIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-30"
                    }`}
                  >
                    {/* 타이틀 */}
                    <div className="mb-4 mt-8 text-6xl font-bold text-white">
                      0{index + 1}
                    </div>
                    <h2 className="mb-4 text-5xl font-bold leading-tight text-white">
                      {section.title}
                    </h2>

                    {/* 설명 */}
                    <p className="mb-6 whitespace-pre-line text-xl leading-relaxed text-white md:text-2xl">
                      {section.description}
                    </p>

                    {/* 푸터 텍스트 */}
                    <p className="mb-12 text-sm text-white md:text-base">
                      {section.footer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 오른쪽: STICKY로 고정된 모바일 화면 */}
            <div className="hidden lg:block">
              {/* h-screen  */}
              <div className="sticky bottom-20 top-20 flex flex-col items-center justify-center gap-6 py-20">
                {/* 모바일 프레임 */}
                <div className="relative h-[60vh] w-full overflow-hidden rounded-[3rem] border-8 border-gray-800 bg-gray-900 shadow-2xl">
                  {/* 화면 콘텐츠 */}
                  <div className="relative h-full w-full overflow-hidden bg-white">
                    {/* 이미지 슬라이더 */}
                    <div className="absolute left-0 right-0 top-0 h-full">
                      {sections.map((section, index) => (
                        <div
                          key={section.id}
                          className={`bg-primary-normal absolute inset-0 transition-all duration-700 ${
                            activeIndex === index
                              ? "scale-100 opacity-100"
                              : "scale-85 opacity-0"
                          }`}
                        >
                          <img
                            src={section.image}
                            alt={section.productName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* 제품 정보 카드 */}
                    <div className="absolute bottom-4 left-4 right-4 overflow-hidden rounded-3xl bg-white/20 p-6 shadow-2xl shadow-md backdrop-blur-md">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0, x: 72 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -72 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          <h4 className="mb-2 text-2xl font-bold text-gray-900">
                            {sections[activeIndex]?.productName}
                          </h4>
                          <p className="mb-6 text-sm text-gray-900">
                            {sections[activeIndex]?.productDesc}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                {/* 인디케이터 */}
                <div className="flex items-center gap-3">
                  {sections.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-500 ${
                        i === activeIndex
                          ? "h-2 w-12 bg-white"
                          : "h-2 w-2 bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
