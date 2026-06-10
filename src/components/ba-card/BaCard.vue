<script setup lang="ts">
import { computed } from 'vue';
import type { CardPadding, CardShadow } from './types';

defineOptions({
  name: 'BaCard'
});

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    shadow?: CardShadow;
    padding?: CardPadding;
    interactive?: boolean;
  }>(),
  {
    title: '',
    description: '',
    shadow: 'hover',
    padding: 'md',
    interactive: false
  }
);

const cardClasses = computed(() => [
  'ba-card',
  `ba-card--shadow-${props.shadow}`,
  `ba-card--padding-${props.padding}`,
  {
    'is-interactive': props.interactive
  }
]);
</script>

<template>
  <article :class="cardClasses">
    <header v-if="title || description || $slots.header" class="ba-card__header">
      <slot name="header">
        <h3 v-if="title" class="ba-card__title">{{ title }}</h3>
        <p v-if="description" class="ba-card__description">{{ description }}</p>
      </slot>
    </header>

    <div class="ba-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="ba-card__footer">
      <slot name="footer" />
    </footer>
  </article>
</template>
