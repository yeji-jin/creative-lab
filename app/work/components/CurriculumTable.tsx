"use client";

import { motion } from "framer-motion";

type Color = "emerald" | "cyan";

interface OfflineSection {
  id: number;
  name: string;
  items: {
    title: string;
    content?: string;
  }[];
  projectTitle: string;
  additionalProject?: string;
}

interface OfflineClassData {
  title: string;
  color: Color;
  sections: OfflineSection[];
}

interface OnlineVODData {
  title: string;
  color: Color;
  items: string[];
}

const offlineClassData: OfflineClassData = {
  title: "5시간 오프라인 클래스",
  color: "emerald" as const,
  sections: [
    {
      id: 1,
      name: "데이터 분석 이해",
      items: [
        {
          title: "데이터 분석을 위한 AI 프롬프트 기법 설계",
          content: "hoverContent",
        },
        {
          title: "AI를 활용한 비즈니스 문제 정의 및 가설 설정",
          content: "hoverContent",
        },
        {
          title: "데이터 탐색을 위한 AI 기반 리서치",
          content: "hoverContent",
        },
      ],
      projectTitle: "AI를 활용한 데이터 분석 기획 문서 작성",
    },
    {
      id: 2,
      name: "데이터 분석 실행",
      items: [
        {
          title: "AI 기반 데이터 탐색 및 전처리 (EDA)",
          content: "hoverContent",
        },
        {
          title: "AI로 하는 데이터 분석 및 모델링",
          content: "hoverContent",
        },
        {
          title: "액셀 대시보드 제작 with AI",
          content: "hoverContent",
        },
      ],
      projectTitle: "비즈니스 데이터를 활용한 대시보드 제작 미니 프로젝트",
    },
    {
      id: 3,
      name: "데이터 분석 자동화",
      items: [
        {
          title: "GPTs 구조 및 활용 사례 이해",
          content: "hoverContent",
        },
      ],
      projectTitle: "주간 KPI 모니터링 GPTs 제작",
      additionalProject: "재무·비용 구조 분석 GPTs 제작",
    },
  ],
};

const onlineVODData: OnlineVODData = {
  title: "40시간 온라인 VOD",
  color: "cyan" as const,
  items: [
    "데이터 분석 필수 개념",
    "액셀 데이터 분석",
    "직무별 데이터 분석 및 Case Study",
    "데이터 기반 보고서 작성",
    "데이터로 설득하기",
    "데이터 분석 심화",
  ],
};

// ✨ 통합 데이터 구조로 변환 (UI 렌더링용)
const getCombinedData = () => {
  const sections = [];

  // 오프라인 클래스 섹션들 추가
  offlineClassData.sections.forEach((section, index) => {
    const items = [
      {
        id: `${section.id}-0`,
        title: section.name,
        highlight: false,
        content: undefined,
      },
      ...section.items.map((item, i) => ({
        id: `${section.id}-${i + 1}`,
        title: item.title,
        content: item.content,
        highlight: false,
      })),
      {
        id: `${section.id}-project`,
        title: section.projectTitle,
        highlight: true,
        content: undefined,
      },
    ];

    if (section.additionalProject) {
      items.push({
        id: `${section.id}-project2`,
        title: section.additionalProject,
        highlight: true,
        content: undefined,
      });
    }

    sections.push({
      id: section.id,
      title: index === 0 ? offlineClassData.title : "",
      color: offlineClassData.color,
      items,
    });
  });

  // 온라인 VOD 섹션 추가
  sections.push({
    id: 4,
    title: onlineVODData.title,
    color: onlineVODData.color,
    items: onlineVODData.items.map((item, i) => ({
      id: `vod-${i}`,
      title: item,
      highlight: false,
      content: undefined,
    })),
  });

  return { sections };
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function CurriculumTable() {
  const curriculumData = getCombinedData();

  return (
    <div className="bg-gray-900 py-20">
      <h2 className="mb-20 text-center text-4xl font-bold leading-relaxed text-white">
        커리큘럼부터
        <br /> 추가 VOD까지!
      </h2>
      <div className="mx-auto max-w-7xl px-4">
        {/* Titles */}
        <div className="relative mb-12 hidden grid-cols-4 gap-8 md:grid">
          <div className="col-span-3 flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="h-3 w-3 rounded-full bg-emerald-500"
            />
            <h2 className="text-xl font-bold text-emerald-500">
              {offlineClassData.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="h-3 w-3 rounded-full bg-cyan-400"
            />
            <h2 className="text-xl font-bold text-cyan-400">
              {onlineVODData.title}
            </h2>
          </div>
        </div>

        {/* Timeline and Content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Desktop */}
          <div className="relative hidden grid-cols-4 gap-8 md:grid">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 h-2 w-full overflow-hidden rounded-md">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full origin-left"
                style={{
                  background:
                    "linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) 75.6%, rgb(34, 211, 238) 75.6%, rgb(34, 211, 238) 100%)",
                }}
              />
            </div>

            {/* Grid로 배치 */}
            {curriculumData.sections.map((section, sectionIndex) => (
              <div key={section.id} className="relative space-y-3 pt-8">
                {section.items.map((item, itemIndex) => {
                  // 전체 인덱스 계산
                  const globalIndex =
                    curriculumData.sections
                      .slice(0, sectionIndex)
                      .reduce((acc, s) => acc + s.items.length, 0) + itemIndex;

                  const isVODSection = section.title === "40시간 온라인 VOD";

                  return (
                    <motion.div
                      key={item.id}
                      custom={globalIndex}
                      variants={itemVariant}
                      whileHover={{ scale: 1.05 }}
                      className={`group relative flex min-h-20 cursor-pointer items-center justify-center break-keep rounded-lg p-4 text-center text-sm font-medium transition-shadow hover:shadow-lg ${
                        itemIndex === 0 && !isVODSection
                          ? "!bg-gray-200 text-xl font-bold"
                          : ""
                      } ${
                        item.highlight
                          ? section.color === "emerald"
                            ? "bg-emerald-600 text-white"
                            : "bg-cyan-600 text-white"
                          : section.color === "emerald"
                            ? "bg-emerald-100 text-gray-800"
                            : "bg-cyan-100 text-gray-800"
                      }`}
                    >
                      <span className="relative z-10">{item.title}</span>
                      {item.content && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-black/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <p className="px-3 text-center text-xs font-bold text-white">
                            {item.content}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Vertical Dashed Line */}
            <div className="absolute left-[75.6%] top-8 h-[calc(100%-2rem)]">
              <div className="h-full w-0.5 border-l-2 border-dashed border-gray-600" />
            </div>
          </div>

          {/* Mobile */}
          <div className="space-y-10 md:hidden">
            {curriculumData.sections.map((section) => (
              <motion.div key={section.id} className="relative">
                {section.title && (
                  <div className="mb-4 flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`h-3 w-3 rounded-full ${
                        section.color === "emerald"
                          ? "bg-emerald-500"
                          : "bg-cyan-400"
                      }`}
                    />
                    <h3
                      className={`text-base font-bold ${
                        section.color === "emerald"
                          ? "text-emerald-500"
                          : "text-cyan-400"
                      }`}
                    >
                      {section.title}
                    </h3>
                  </div>
                )}

                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariant}
                      className={`break-keep rounded-lg px-4 py-8 text-center text-sm ${
                        itemIndex === 0 ? "font-bold" : "font-medium"
                      } ${
                        item.highlight
                          ? section.color === "emerald"
                            ? "bg-emerald-600 text-white"
                            : "bg-cyan-600 text-white"
                          : section.color === "emerald"
                            ? "bg-emerald-100 text-gray-800"
                            : "bg-cyan-100 text-gray-800"
                      }`}
                    >
                      {item.title}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
