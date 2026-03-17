import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { visit } from "unist-util-visit";

function remarkNormalizeCodeLang() {
  return (tree: unknown) => {
    visit(
      tree as never,
      (node: { type?: string; lang?: unknown }) =>
        node?.type === "code" || node?.type === "mdxJsxFlowElement",
      (node: { type?: string; lang?: unknown }) => {
        if (node?.type !== "code") return;
        if (typeof node.lang !== "string") return;
        const normalized = node.lang.trim().toLowerCase();
        if (normalized === "flutter") node.lang = "dart";
      }
    );
  };
}

export async function renderMdx(source: string) {
  const prettyCodeOptions: Options = {
    theme: "github-dark-default",
    keepBackground: true,
    defaultLang: "text",
  };

  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkNormalizeCodeLang],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return content;
}

