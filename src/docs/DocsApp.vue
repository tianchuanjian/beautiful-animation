<script setup lang="ts">
import { ref } from 'vue';
import { BaButton, BaInput } from '../index';

type TableRow = {
  name: string;
  type: string;
  default: string;
  description: string;
};

const amount = ref('12888.50');
const note = ref('填写你的备注');
const loading = ref(false);

const inputProps: TableRow[] = [
  { name: 'modelValue', type: 'string | number | null', default: "''", description: '绑定值。金额模式下回传不带千分位的字符串。' },
  { name: 'mode', type: "'text' | 'amount'", default: "'text'", description: '输入模式。amount 会限制为数字与小数点。' },
  { name: 'decimalPlaces', type: 'number', default: '2', description: '金额模式下的小数位数。' },
  { name: 'useThousandSeparator', type: 'boolean', default: 'false', description: '展示层是否显示千分位分隔符。' },
  { name: 'placeholder', type: 'string', default: "''", description: '占位文本。' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清空按钮。' },
  { name: 'prefix / suffix', type: 'string', default: "''", description: '输入框前后缀。也可以通过 slot 自定义。' },
  { name: 'status', type: "'default' | 'success' | 'warning' | 'error'", default: "'default'", description: '状态样式。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸。' },
];

const inputEvents: TableRow[] = [
  { name: 'update:modelValue', type: '(value: string) => void', default: '-', description: 'v-model 更新。' },
  { name: 'input', type: '(value: string) => void', default: '-', description: '输入时触发。' },
  { name: 'change', type: '(value: string) => void', default: '-', description: '值变化并失焦后触发。' },
  { name: 'clear', type: '() => void', default: '-', description: '点击清空按钮触发。' },
  { name: 'focus / blur', type: '(event: FocusEvent) => void', default: '-', description: '聚焦与失焦事件。' },
];

const buttonProps: TableRow[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: '按钮视觉风格。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '按钮尺寸。' },
  { name: 'nativeType', type: "'button' | 'submit' | 'reset'", default: "'button'", description: '原生 button 类型。' },
  { name: 'loading', type: 'boolean', default: 'false', description: '加载态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用态。' },
  { name: 'block', type: 'boolean', default: 'false', description: '是否撑满容器宽度。' },
  { name: 'round', type: 'boolean', default: 'false', description: '是否胶囊圆角。' },
];

const buttonSlots: TableRow[] = [
  { name: 'default', type: '-', default: '-', description: '按钮正文。' },
  { name: 'prefix', type: '-', default: '-', description: '前置图标位。' },
  { name: 'suffix', type: '-', default: '-', description: '后置图标位。' },
];

const quickStartCode = `<script setup lang="ts">
import { createApp } from 'vue';
import BeautifulAnimation from 'beautiful-animation';
import 'beautiful-animation/style.css';
import App from './App.vue';

createApp(App).use(BeautifulAnimation).mount('#app');
<\/script>`;

const amountCode = `<script setup lang="ts">
import { ref } from 'vue';
import { BaInput } from 'beautiful-animation';
import 'beautiful-animation/style.css';

const amount = ref('12888.50');
<\/script>`;

const buttonCode = `<script setup lang="ts">
import { ref } from 'vue';
import { BaButton } from 'beautiful-animation';
import 'beautiful-animation/style.css';

const loading = ref(false);
<\/script>`;

function simulateLoading() {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
  }, 1200);
}
</script>

<template>
  <div class="docs-shell">
    <aside class="docs-sidebar">
      <div class="brand-card">
        <div class="brand-mark">BA</div>
        <div>
          <div class="brand-name">beautiful-animation</div>
          <div class="brand-subtitle">Vue 3 组件库文档</div>
        </div>
      </div>

      <nav class="docs-nav">
        <a href="#quick-start">快速开始</a>
        <a href="#input">BaInput</a>
        <a href="#button">BaButton</a>
        <a href="#theme">设计建议</a>
      </nav>

      <div class="sidebar-note">
        <strong>发布建议</strong>
        <p>先把基础件补齐，再逐步加动画、弹层和表单能力。</p>
      </div>
    </aside>

    <main class="docs-main">
      <section class="hero-card">
        <p class="eyebrow">Component Library</p>
        <h1>像 Element Plus / Ant Design Vue 一样浏览组件、示例和 API。</h1>
        <p class="hero-copy">
          这是一个可直接运行的文档首页，左侧导航，右侧示例与 API 表格，方便你边看边用，也方便后面继续扩展。
        </p>

        <div class="hero-metrics">
          <div>
            <span>已完成</span>
            <strong>2</strong>
          </div>
          <div>
            <span>模式</span>
            <strong>Amount Input</strong>
          </div>
          <div>
            <span>发布目标</span>
            <strong>npm</strong>
          </div>
        </div>
      </section>

      <section id="quick-start" class="docs-section">
        <div class="section-head">
          <div>
            <p class="section-kicker">01</p>
            <h2>快速开始</h2>
          </div>
        </div>

        <div class="section-grid">
          <div class="doc-panel">
            <h3>安装与注册</h3>
            <pre class="code-block"><code>{{ quickStartCode }}</code></pre>
          </div>

          <div class="doc-panel">
            <h3>使用方式</h3>
            <ul class="bullet-list">
              <li>全量注册：<code>app.use(BeautifulAnimation)</code></li>
              <li>按需引入：直接 <code>import { BaInput, BaButton }</code></li>
              <li>样式文件：<code>import 'beautiful-animation/style.css'</code></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="input" class="docs-section">
        <div class="section-head">
          <div>
            <p class="section-kicker">02</p>
            <h2>BaInput</h2>
          </div>
          <p class="section-desc">支持普通输入和金额模式，金额模式展示千分位，但值回传不带逗号。</p>
        </div>

        <div class="demo-card">
          <div class="demo-preview">
            <BaInput
              v-model="amount"
              label="合同金额"
              mode="amount"
              :decimal-places="2"
              :use-thousand-separator="true"
              prefix="¥"
              hint="展示自动带千分位，传出的值不带逗号"
              clearable
            />

            <BaInput
              v-model="note"
              label="备注"
              placeholder="请输入备注"
              suffix="可选"
              clearable
            />
          </div>

          <div class="demo-meta">
            <div>
              <span>金额值</span>
              <strong>{{ amount }}</strong>
            </div>
            <div>
              <span>备注值</span>
              <strong>{{ note }}</strong>
            </div>
          </div>
        </div>

        <div class="section-grid">
          <div class="doc-panel">
            <h3>引入示例</h3>
            <pre class="code-block"><code>{{ amountCode }}</code></pre>
          </div>

          <div class="doc-panel">
            <h3>Props</h3>
            <table class="api-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>类型</th>
                  <th>默认</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in inputProps" :key="row.name">
                  <td>{{ row.name }}</td>
                  <td>{{ row.type }}</td>
                  <td>{{ row.default }}</td>
                  <td>{{ row.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="doc-panel">
          <h3>Events</h3>
          <table class="api-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in inputEvents" :key="row.name">
                <td>{{ row.name }}</td>
                <td>{{ row.type }}</td>
                <td>{{ row.default }}</td>
                <td>{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="button" class="docs-section">
        <div class="section-head">
          <div>
            <p class="section-kicker">03</p>
            <h2>BaButton</h2>
          </div>
          <p class="section-desc">提供多种视觉风格和加载态，适合作为整个库的交互门面组件。</p>
        </div>

        <div class="demo-card">
          <div class="demo-preview demo-preview--buttons">
            <BaButton variant="primary" @click="simulateLoading">Primary</BaButton>
            <BaButton variant="secondary">Secondary</BaButton>
            <BaButton variant="ghost">Ghost</BaButton>
            <BaButton variant="danger">Danger</BaButton>
            <BaButton :loading="loading" block>Loading Demo</BaButton>
          </div>

          <div class="demo-meta">
            <div>
              <span>当前状态</span>
              <strong>{{ loading ? 'loading' : 'idle' }}</strong>
            </div>
            <div>
              <span>推荐场景</span>
              <strong>提交 / 弹窗 / 操作触发</strong>
            </div>
          </div>
        </div>

        <div class="section-grid">
          <div class="doc-panel">
            <h3>引入示例</h3>
            <pre class="code-block"><code>{{ buttonCode }}</code></pre>
          </div>

          <div class="doc-panel">
            <h3>Props</h3>
            <table class="api-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>类型</th>
                  <th>默认</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in buttonProps" :key="row.name">
                  <td>{{ row.name }}</td>
                  <td>{{ row.type }}</td>
                  <td>{{ row.default }}</td>
                  <td>{{ row.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="doc-panel">
          <h3>Slots</h3>
          <table class="api-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in buttonSlots" :key="row.name">
                <td>{{ row.name }}</td>
                <td>{{ row.type }}</td>
                <td>{{ row.default }}</td>
                <td>{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="theme" class="docs-section">
        <div class="section-head">
          <div>
            <p class="section-kicker">04</p>
            <h2>设计建议</h2>
          </div>
        </div>

        <div class="section-grid">
          <div class="doc-panel">
            <h3>下一步最值得补的组件</h3>
            <ul class="bullet-list">
              <li>Textarea</li>
              <li>Select</li>
              <li>Dialog</li>
              <li>Form / FormItem</li>
            </ul>
          </div>

          <div class="doc-panel">
            <h3>统一建议</h3>
            <ul class="bullet-list">
              <li>把圆角、阴影、主色和动效时长收敛成 token</li>
              <li>每个组件都配一个最小可运行示例</li>
              <li>后续可以加组件搜索和主题切换</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
