# beautiful-animation

一个基于 Vue 3 的动画组件库项目，当前已经包含：

- `BaInput`
- `BaButton`
- 本地文档站
- npm 发布配置
- GitHub Pages 文档部署配置

## 本地开发

安装依赖：

```bash
npm install
```

启动文档站：

```bash
npm run dev
```

构建组件库：

```bash
npm run build
```

构建文档静态站：

```bash
npm run docs:build
```

检查最终 npm 包内容：

```bash
npm run pack:check
```

## 项目里的两条发布链路

### 1. 发布到 npm

发布后，别人会在 [npmjs.com](https://www.npmjs.com/) 看到你的包，并可以通过下面方式安装：

```bash
npm install 你的包名
```

正式发布前建议确认这些项：

1. 把 `package.json` 里的 `name` 改成你最终的 npm 包名。
2. 如果包名没有组织前缀，先去 npm 查一下是否已被占用。
3. 如果你想补完整元信息，再加上 `repository`、`homepage`、`bugs` 字段。
4. 先执行一次 `npm run build` 和 `npm run pack:check`。
5. 创建 npm token。
6. 把 token 放到环境变量 `NPM_TOKEN`。
7. 执行 `npm publish`。

项目里已经补好了这些发布辅助项：

- `files: ["dist"]`，只发布构建产物
- `publishConfig.access = "public"`
- `prepublishOnly`，发布前自动构建
- `LICENSE`，MIT 开源协议
- 项目级 `.npmrc` 会从 `NPM_TOKEN` 环境变量读取 token

### Token 发布方案

npm 官方支持在网站上创建 granular access token，并可选开启 bypass 2FA：

- [Creating and viewing access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens/)

推荐你在 npm 网站里这样配置 token：

1. 进入 `npmjs.com` -> 头像 -> `Access Tokens`
2. 点击 `Generate New Token`
3. 创建 `Granular Access Token`
4. 勾选 `Bypass two-factor authentication`
5. 权限选择 `Read and write`
6. 包范围选择 `All Packages` 或只选当前包
7. 复制生成出的 token

项目根目录已经加了 [\.npmrc](D:/Users/41031/AppData/Local/tcj-project/beautiful-animation/.npmrc:1)：

```ini
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

这意味着 token 不会写死到仓库里，而是通过环境变量注入。

#### 本机发布

PowerShell:

```powershell
$env:NPM_TOKEN="你的npm_token"
npm publish
```

如果想只在当前终端临时生效，用上面这种方式就够了。

如果想长期保留到当前用户环境变量，可以执行：

```powershell
[System.Environment]::SetEnvironmentVariable("NPM_TOKEN", "你的npm_token", "User")
```

设置后建议重新开一个终端，再执行：

```bash
npm publish
```

### 2. 部署组件文档站

文档站不是发到 `npmjs.com`，而是单独部署成网页，适合给别人查看组件示例、API 和使用方法。

这个项目已经准备好了 GitHub Pages 工作流：

- [deploy-docs.yml](D:/Users/41031/AppData/Local/tcj-project/beautiful-animation/.github/workflows/deploy-docs.yml:1)

它会在以下场景触发：

- 推送到 `main`
- 手动执行 `workflow_dispatch`

文档产物会输出到：

- `docs-dist`

我已经把文档构建的 `base` 改成了相对路径，所以部署到 GitHub Pages 这种子路径站点也能正常加载静态资源。

## 自动化发布

项目里还加了一个 npm 发布工作流：

- [publish-npm.yml](D:/Users/41031/AppData/Local/tcj-project/beautiful-animation/.github/workflows/publish-npm.yml:1)

它会在以下场景触发：

- 推送版本 tag 时自动触发，例如 `v0.1.0`
- GitHub Release 发布时自动触发

使用前需要在 GitHub 仓库里配置：

- `Settings -> Secrets and variables -> Actions`
- 新增 secret：`NPM_TOKEN`

这个 `NPM_TOKEN` 需要从你的 npm 账号里创建。
如果你的 npm 账号开启了 2FA，建议使用 granular access token，并开启可用于发布的 bypass 2FA 配置。

推荐的发版方式：

```bash
git tag v0.1.0
git push origin v0.1.0
```

或者在 GitHub 上创建一个 Release，也会触发自动发布。

## 组件用法

### 全量注册

```ts
import { createApp } from "vue";
import BeautifulAnimation from "beautiful-animation";
import "beautiful-animation/style.css";
import App from "./App.vue";

createApp(App).use(BeautifulAnimation).mount("#app");
```

### 按需使用

```vue
<script setup lang="ts">
import { ref } from "vue";
import { BaButton, BaInput } from "beautiful-animation";
import "beautiful-animation/style.css";

const amount = ref("12888.50");

function handleSubmit() {
	console.log("submit value:", amount.value);
}
</script>

<template>
	<div style="display: grid; gap: 16px; max-width: 420px;">
		<BaInput
			v-model="amount"
			label="合同金额"
			mode="amount"
			:decimal-places="2"
			:use-thousand-separator="true"
			prefix="¥"
			hint="展示自动带千分位，传出的值不带逗号"
			clearable />

		<BaButton variant="primary" @click="handleSubmit"> 立即提交 </BaButton>
	</div>
</template>
```

## 当前组件能力

### `BaInput`

- `mode="text"`：普通输入模式
- `mode="amount"`：金额输入模式，只允许数字和小数点
- `decimalPlaces`：控制小数位数
- `useThousandSeparator`：控制展示层是否显示千分位
- `v-model`：始终回传不带逗号的值
- `prefix` / `suffix`：前后缀
- `clearable`：清空按钮
- `status`：`default | success | warning | error`
- `size`：`sm | md | lg`

### `BaButton`

- `variant`：`primary | secondary | ghost | danger`
- `size`：`sm | md | lg`
- `nativeType`：`button | submit | reset`
- `loading`：加载态
- `disabled`：禁用态
- `block`：100% 宽度按钮
- `round`：胶囊圆角
- `prefix` / `suffix` slot：前后图标位

## 你接下来只需要补的内容

1. 确认最终 npm 包名。
2. 把仓库推到 GitHub。
3. 在 GitHub 仓库里开启 Pages。
4. 配置 `NPM_TOKEN` secret。
5. 首次手动发布一次 npm 包。

## 下一步建议

- 增加 `Textarea`、`Select`、`Dialog`
- 给文档站加“复制代码”按钮
- 给文档站加组件搜索
- 后续把 design token 抽成单独文件，支持主题化
