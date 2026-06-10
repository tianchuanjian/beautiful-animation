<script setup lang="ts">
import type { TimelineItem } from './types';

defineOptions({
  name: 'BaTimeline'
});

withDefaults(
  defineProps<{
    items?: TimelineItem[];
  }>(),
  {
    items: () => []
  }
);
</script>

<template>
  <div class="ba-timeline">
    <article
      v-for="(item, index) in items"
      :key="`${item.title}-${index}`"
      class="ba-timeline__item"
    >
      <span class="ba-timeline__rail"></span>
      <span class="ba-timeline__dot" :class="`is-${item.status || 'default'}`"></span>

      <div class="ba-timeline__content">
        <div class="ba-timeline__head">
          <strong class="ba-timeline__title">{{ item.title }}</strong>
          <span v-if="item.time" class="ba-timeline__time">{{ item.time }}</span>
        </div>
        <p v-if="item.description" class="ba-timeline__description">{{ item.description }}</p>
      </div>
    </article>
  </div>
</template>
