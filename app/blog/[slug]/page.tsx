import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<string, { title: string; date: string; body: string }> = {
  "first-post": {
    title: "첫 번째 글",
    date: "2024-01-15",
    body: "App Router와 (root) 라우트 그룹을 사용하면 URL 구조에 영향을 주지 않고 레이아웃을 공유할 수 있습니다. 괄호로 감싼 폴더는 세그먼트에 포함되지 않습니다.",
  },
  "second-post": {
    title: "두 번째 글",
    date: "2024-02-01",
    body: "Next.js 14에서는 App Router가 기본입니다. Server Components, 레이아웃, 로딩 UI 등을 활용해 효율적인 앱을 만들 수 있습니다.",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.body };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/blog"
        className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Blog
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {post.title}
      </h1>
      <time className="mt-2 block text-sm text-neutral-500">{post.date}</time>
      <p className="mt-6 leading-relaxed text-neutral-600">{post.body}</p>
    </article>
  );
}
