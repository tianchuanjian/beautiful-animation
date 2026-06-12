# beautiful-animation

一个基于 Vue 3 的组件库，主打顺滑动画、漂亮的交互细节和可直接复用的表单体验。

## 特性

- Vue 3 + TypeScript
- 轻量、可按需引入
- 统一风格的动画和视觉语言
- 配套文档站，支持组件查看、API 和示例

## 安装

```bash
npm install beautiful-animation
```

## 使用

```ts
import { createApp } from 'vue';
import BeautifulAnimation from 'beautiful-animation';
import 'beautiful-animation/style.css';
import App from './App.vue';

createApp(App).use(BeautifulAnimation).mount('#app');
```

按需使用：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { BaInput, BaButton } from 'beautiful-animation';
import 'beautiful-animation/style.css';

const amount = ref('12888.50');
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
      clearable
    />

    <BaButton variant="primary">提交</BaButton>
  </div>
</template>
```

## 文档

- 在线文档：<https://tianchuanjian.github.io/beautiful-animation/>
- 组件示例和 API：见文档站

## 当前已发布组件

- BaInput
- BaTextarea
- BaSelect
- BaPopover
- BaCheckbox
- BaRadio
- BaSwitch
- BaButton
- BaBadge
- BaTag
- BaAvatar
- BaCard
- BaDivider
- BaAlert
- BaProgress
- BaSkeleton
- BaEmpty
- BaStat
- BaBreadcrumb
- BaTabs
- BaSteps
- BaTimeline

## 许可证

MIT
