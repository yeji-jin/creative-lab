import Link from "next/link";

export const metadata = {
  title: "홈",
  description: "Creative Lab 메인 페이지",
};

export default function RootPage() {
  return (
    <section className="mx-auto w-full max-w-7xl py-12 text-center sm:py-20">
      <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
        Creative Lab
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
        경쟁사 컴포넌트 조사 및 다양한 베리에이션 작업
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/work"
          className="block min-w-52 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-neutral-300"
        >
          Work
        </Link>
      </div>
    </section>
  );
}
