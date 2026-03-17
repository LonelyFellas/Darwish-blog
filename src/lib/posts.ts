import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return "";
}

function normalizeMeta(data: Record<string, unknown>): PostMeta {
  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: toDateString(data.date),
    tags: Array.isArray(data.tags)
      ? data.tags.map((t) => String(t))
      : undefined,
    category:
      typeof data.category === "string" ? data.category : undefined,
    draft: data.draft === true,
  };
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  const posts: Post[] = files
    .map((filename) => {
      const fullPath = path.join(POSTS_DIR, filename);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      const meta = normalizeMeta(data as Record<string, unknown>);
      if (meta.draft === true) return null;
      return {
        slug: getSlugFromFilename(filename),
        meta,
        content,
      };
    })
    .filter((p): p is Post => p !== null);
  return posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const fullPath = path.join(POSTS_DIR, `${slug}${ext}`);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        meta: normalizeMeta(data as Record<string, unknown>),
        content,
      };
    }
  }
  return null;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.meta.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
