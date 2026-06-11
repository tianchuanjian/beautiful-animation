<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import DocsApiTable from './components/DocsApiTable.vue';
import DocsDemoPreview from './components/DocsDemoPreview.vue';
import {
  categoryLabels,
  componentDocs,
  componentPageCount,
  fallbackPath,
  githubUrl,
  navCategories,
  npmUrl,
  pages,
  quickStartCode
} from './data';
import type { ComponentPagePath, DocPage, PagePath } from './types';

const searchQuery = ref('');
const currentPath = ref<PagePath>(fallbackPath);

function normalizePath(hash: string) {
  const cleaned = hash.replace(/^#/, '').trim();

  if (!cleaned) {
    return fallbackPath;
  }

  const path = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  return (pages.find((page) => page.path === path)?.path ?? fallbackPath) as PagePath;
}

function syncRoute() {
  currentPath.value = typeof window === 'undefined' ? fallbackPath : normalizePath(window.location.hash);
}

onMounted(() => {
  if (!window.location.hash) {
    window.location.hash = `#${fallbackPath}`;
  }

  syncRoute();
  window.addEventListener('hashchange', syncRoute);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncRoute);
});

const currentPageIndex = computed(() => pages.findIndex((page) => page.path === currentPath.value));
const currentPage = computed(() => pages[currentPageIndex.value] ?? pages[0]);
const currentComponentPath = computed<ComponentPagePath | null>(() => {
  if (currentPage.value.path === fallbackPath) {
    return null;
  }

  return currentPage.value.path as ComponentPagePath;
});
const currentComponentDoc = computed(() => {
  if (!currentComponentPath.value) {
    return null;
  }

  return componentDocs[currentComponentPath.value];
});

const previousPage = computed(() => pages[currentPageIndex.value - 1] ?? null);
const nextPage = computed(() => pages[currentPageIndex.value + 1] ?? null);
const normalizedSearch = computed(() => searchQuery.value.trim().toLowerCase());

function matchesSearch(page: DocPage) {
  if (!normalizedSearch.value) {
    return true;
  }

  const haystack = [page.title, page.summary, ...page.keywords].join(' ').toLowerCase();
  return haystack.includes(normalizedSearch.value);
}

const filteredPages = computed(() => pages.filter(matchesSearch));
const filteredPageCount = computed(() => filteredPages.value.length);
const navGroups = computed(() =>
  navCategories
    .map((category) => ({
      category,
      title: categoryLabels[category],
      pages: filteredPages.value.filter((page) => page.category === category)
    }))
    .filter((group) => group.pages.length > 0)
);

function isActive(path: string) {
  return currentPage.value.path === path;
}

function pageHref(path: string) {
  return `#${path}`;
}

function categoryText(page: DocPage) {
  return categoryLabels[page.category];
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

      <div class="docs-search">
        <label class="docs-search__label" for="docs-search">搜索</label>
        <input
          id="docs-search"
          v-model="searchQuery"
          class="docs-search__input"
          type="text"
          placeholder="搜索组件 / 关键词"
        />
        <p class="docs-search__meta">{{ filteredPageCount }} 个结果</p>
      </div>

      <div class="docs-sidebar__content">
        <div
          v-for="group in navGroups"
          :key="group.category"
          class="docs-nav-group"
        >
          <p class="docs-nav-group__title">{{ group.title }}</p>
          <nav class="docs-nav">
            <a
              v-for="page in group.pages"
              :key="page.path"
              :href="pageHref(page.path)"
              :class="{ 'is-active': isActive(page.path) }"
            >
              <span class="docs-nav__title">{{ page.title }}</span>
            </a>
          </nav>
        </div>

        <div v-if="filteredPageCount === 0" class="docs-empty-state">
          <strong>没有匹配结果</strong>
          <p>试试输入 `select`、`progress`、`tabs` 或 `timeline`。</p>
        </div>

        <div class="sidebar-note">
          <strong>当前方向</strong>
          <p>组件数已经超过 20，后续继续沿着统一 token、顺滑动画和紧凑文档目录往前补强。</p>
        </div>
      </div>
    </aside>

    <main class="docs-main">
      <section class="hero-card">
        <div class="hero-toolbar">
          <span class="hero-toolbar__label">Release Links</span>

          <div class="hero-toolbar__actions">
            <a class="hero-link hero-link--npm" :href="npmUrl" target="_blank" rel="noreferrer">npm</a>
            <a class="hero-link hero-link--github" :href="githubUrl" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <p class="eyebrow">Component Library</p>
        <h1>{{ currentPage.title }}</h1>
        <p class="hero-copy">{{ currentPage.summary }}</p>

        <div class="hero-metrics">
          <div>
            <span>当前页面</span>
            <strong>{{ currentPageIndex + 1 }}/{{ pages.length }}</strong>
          </div>
          <div>
            <span>组件总数</span>
            <strong>{{ componentPageCount }}</strong>
          </div>
          <div>
            <span>分类</span>
            <strong>{{ categoryText(currentPage) }}</strong>
          </div>
        </div>
      </section>

      <section v-if="currentPage.path === '/guide/getting-started'" class="docs-section">
        <div class="section-grid">
          <div class="doc-panel">
            <h3>安装与注册</h3>
            <pre class="code-block"><code>{{ quickStartCode }}</code></pre>
          </div>

          <div class="doc-panel">
            <h3>使用方式</h3>
            <ul class="bullet-list">
              <li>全量注册：`app.use(BeautifulAnimation)`</li>
              <li>按需引入：`import { BaInput, BaSelect, BaPopover, BaCheckbox, BaRadio, BaSwitch } from 'beautiful-animation'`</li>
              <li>样式入口：`import 'beautiful-animation/style.css'`</li>
            </ul>
          </div>
        </div>

        <div class="section-grid">
          <div class="doc-panel">
            <h3>当前已完成的组件</h3>
            <ul class="bullet-list">
              <li>Form：BaInput、BaTextarea、BaSelect、BaCheckbox、BaRadio、BaSwitch</li>
              <li>Display：BaButton、BaBadge、BaTag、BaAvatar、BaStat</li>
              <li>Layout：BaCard、BaDivider、BaPopover</li>
              <li>Feedback：BaAlert、BaProgress、BaSkeleton、BaEmpty</li>
              <li>Navigation：BaBreadcrumb、BaTabs、BaSteps、BaTimeline</li>
            </ul>
          </div>

          <div class="doc-panel">
            <h3>设计预期</h3>
            <ul class="bullet-list">
              <li>风格尽量通过全局 token 控制，后续统一换主题时不需要逐个组件拆改。</li>
              <li>交互反馈保持顺滑，有轻微浮起、弹性位移和柔和高光，而不是生硬切换。</li>
              <li>文档继续保持紧凑目录和路由模式，新增组件默认并入搜索和上下页切换。</li>
            </ul>
          </div>
        </div>
      </section>

      <section v-else class="docs-section">
        <div class="section-head">
          <div>
            <p class="section-kicker">Component</p>
            <h2>{{ currentPage.title }}</h2>
          </div>
          <p class="section-desc">{{ currentComponentDoc?.description }}</p>
        </div>

        <DocsDemoPreview
          v-if="currentComponentPath"
          :page-path="currentComponentPath"
        />

        <div v-if="currentComponentDoc" class="section-grid">
          <div class="doc-panel">
            <h3>使用示例</h3>
            <pre class="code-block"><code>{{ currentComponentDoc.usageCode }}</code></pre>
          </div>

          <DocsApiTable title="Props" :rows="currentComponentDoc.props" />
        </div>

        <DocsApiTable
          v-if="currentComponentDoc?.events?.length"
          title="Events"
          :rows="currentComponentDoc.events"
        />

        <DocsApiTable
          v-if="currentComponentDoc?.slots?.length"
          title="Slots"
          :rows="currentComponentDoc.slots"
        />
      </section>

      <nav class="docs-pager">
        <a v-if="previousPage" class="docs-pager__item" :href="pageHref(previousPage.path)">
          <span class="docs-pager__label">上一个</span>
          <strong>{{ previousPage.title }}</strong>
        </a>
        <span v-else class="docs-pager__item docs-pager__item--empty"></span>

        <a v-if="nextPage" class="docs-pager__item docs-pager__item--next" :href="pageHref(nextPage.path)">
          <span class="docs-pager__label">下一个</span>
          <strong>{{ nextPage.title }}</strong>
        </a>
      </nav>
    </main>
  </div>
</template>
