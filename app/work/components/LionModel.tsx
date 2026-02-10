"use client";

import dynamic from "next/dynamic";

const LionScene = dynamic(
  () => import("@/work/components/LionScene").then((mod) => mod.LionScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-500">
        로딩 중...
      </div>
    ),
  },
);

export default function LionModel() {
  return (
    <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl bg-neutral-100">
      <LionScene />
    </div>
  );
}
