# 发布与部署说明

这份文档保存项目的发布、部署和维护说明，不放在 npm 首页 README 里。

## 现有配置

- `.npmrc` 使用 `NPM_TOKEN` 环境变量读取 token
- `publish-npm.yml` 负责 tag 触发的 npm 发布
- `deploy-docs.yml` 负责 GitHub Pages 文档部署

## npm 发布

当前项目使用 `npm publish` 发布到 npm。

建议流程：

```bash
npm run build
npm run pack:check
npm publish
```

如果账号开启了 2FA，建议使用 npm token 发布。

## npm token

推荐在 npm 官网创建 `Granular Access Token`，并开启 `Bypass two-factor authentication`。

本地临时发布可以这样做：

```powershell
$env:NPM_TOKEN="你的 npm token"
npm publish
```

## GitHub Pages

文档站使用 GitHub Pages 部署，适合展示组件、示例和 API。

当前文档构建产物输出到 `docs-dist`，适合直接挂到 Pages。

## GitHub Actions

项目可以配置 Actions 在打 tag 时自动发布。

推荐只在 tag 触发发布，例如：

```bash
git tag v0.1.0
git push origin v0.1.0
```

## 维护建议

- README 保持短、清楚，适合 npm 展示。
- 发布、token、Actions、Pages 这类说明统一放到这里。
- 如果后面增加 CI/CD 流程，再继续拆成更细的运维文档。
