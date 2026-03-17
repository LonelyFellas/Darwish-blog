# 技术博客

基于 [ARCHITECTURE.md](./ARCHITECTURE.md) 的架构搭建的精美技术博客。

## 下一步

1. **选择框架**：在项目根目录执行  
   - Next.js：`npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir`  
   - Astro：`npm create astro@latest .`

2. **创建目录**：按架构文档建立 `content/posts`、`src/components`、`src/lib` 等。

3. **实现数据层**：在 `src/lib/posts.ts` 中实现从 `content/posts` 读取 MDX 与 frontmatter。

4. **实现页面**：首页列表、`post/[slug]` 文章页，再接入代码高亮与主题。

详细分层与技术选型见 [ARCHITECTURE.md](./ARCHITECTURE.md)。
# Darwish-blog
