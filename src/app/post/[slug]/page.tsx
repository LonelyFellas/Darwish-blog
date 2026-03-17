import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { renderMdx } from "@/lib/mdx";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = await renderMdx(post.content);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-10">
        <div className="mb-4">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← 返回首页
          </Link>
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
          {post.meta.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <time dateTime={post.meta.date}>{post.meta.date}</time>
          {post.meta.category ? (
            <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs dark:border-zinc-800">
              {post.meta.category}
            </span>
          ) : null}
          {post.meta.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {post.meta.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {post.meta.description ? (
          <p className="mt-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {post.meta.description}
          </p>
        ) : null}
      </header>

      <article className="mdx">
        <div className="mdx-content">{content}</div>
      </article>
    </div>
  );
}

