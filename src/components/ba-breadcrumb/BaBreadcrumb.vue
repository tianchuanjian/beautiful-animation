<script setup lang="ts">
import type { BreadcrumbItem } from './types';

defineOptions({
  name: 'BaBreadcrumb'
});

withDefaults(
  defineProps<{
    items?: BreadcrumbItem[];
    separator?: string;
  }>(),
  {
    items: () => [],
    separator: '/'
  }
);
</script>

<template>
  <nav class="ba-breadcrumb" aria-label="Breadcrumb">
    <span
      v-for="(item, index) in items"
      :key="`${item.label}-${index}`"
      class="ba-breadcrumb__item"
      :class="{ 'is-disabled': item.disabled, 'is-current': index === items.length - 1 }"
    >
      <a
        v-if="item.href && !item.disabled && index !== items.length - 1"
        class="ba-breadcrumb__link"
        :href="item.href"
      >
        {{ item.label }}
      </a>
      <span v-else class="ba-breadcrumb__text">{{ item.label }}</span>

      <span v-if="index !== items.length - 1" class="ba-breadcrumb__separator">{{ separator }}</span>
    </span>
  </nav>
</template>
