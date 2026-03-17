# 技术博客

基于 [ARCHITECTURE.md](./ARCHITECTURE.md) 的架构搭建的精美技术博客。使用 **pnpm** 管理依赖。

## 开发

安装依赖：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm dev
```

构建与预览：

```bash
pnpm build
pnpm start
```

## 写文章

在 `content/posts/` 新建 `.mdx` 文件（带 frontmatter），首页会自动列出，文章路径为 `/post/<slug>`（默认 slug 为文件名）。

详细分层与技术选型见 [ARCHITECTURE.md](./ARCHITECTURE.md)。
