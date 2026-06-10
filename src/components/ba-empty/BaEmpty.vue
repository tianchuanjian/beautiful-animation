<script setup lang="ts">
import { computed } from 'vue';
import type { EmptySize } from './types';

defineOptions({
  name: 'BaEmpty'
});

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    size?: EmptySize;
  }>(),
  {
    title: '暂无内容',
    description: '当前还没有可展示的数据或结果。',
    size: 'md'
  }
);

const emptyClasses = computed(() => [
  'ba-empty',
  `ba-empty--${props.size}`
]);
</script>

<template>
  <div :class="emptyClasses">
    <div class="ba-empty__illustration" aria-hidden="true">
      <span class="ba-empty__planet"></span>
      <span class="ba-empty__ring"></span>
    </div>

    <strong class="ba-empty__title">{{ title }}</strong>
    <p class="ba-empty__description">{{ description }}</p>

    <div v-if="$slots.default" class="ba-empty__actions">
      <slot />
    </div>
  </div>
</template>
