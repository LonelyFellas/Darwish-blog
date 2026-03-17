import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

export async function renderMdx(source: string) {
  const prettyCodeOptions: Options = {
    theme: {
      dark: "github-dark-default",
      light: "github-light-default",
    },
    keepBackground: false,
    defaultLang: "text",
  };

  const { content } = await compileMDX({
    source,
    options: {
      // frontmatter 解析已在数据层完成；这里仅负责编译/渲染
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return content;
}

