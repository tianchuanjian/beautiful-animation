<script setup lang="ts">
import type { StepItem } from './types';

defineOptions({
  name: 'BaSteps'
});

withDefaults(
  defineProps<{
    modelValue?: number;
    items?: StepItem[];
  }>(),
  {
    modelValue: 0,
    items: () => []
  }
);
</script>

<template>
  <div class="ba-steps">
    <article
      v-for="(item, index) in items"
      :key="`${item.title}-${index}`"
      class="ba-steps__item"
      :class="{
        'is-finished': index < modelValue,
        'is-active': index === modelValue
      }"
    >
      <div class="ba-steps__marker">
        <span class="ba-steps__index">{{ index + 1 }}</span>
        <span v-if="index !== items.length - 1" class="ba-steps__line"></span>
      </div>

      <div class="ba-steps__content">
        <strong class="ba-steps__title">{{ item.title }}</strong>
        <p v-if="item.description" class="ba-steps__description">{{ item.description }}</p>
      </div>
    </article>
  </div>
</template>
