<script setup lang="ts">
import { computed } from 'vue';
import type { StatTrend } from './types';

defineOptions({
  name: 'BaStat'
});

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: number | string;
    hint?: string;
    trend?: StatTrend;
  }>(),
  {
    label: '',
    value: '',
    hint: '',
    trend: 'neutral'
  }
);

const statClasses = computed(() => [
  'ba-stat',
  `ba-stat--${props.trend}`
]);
</script>

<template>
  <div :class="statClasses">
    <div class="ba-stat__head">
      <span v-if="$slots.icon" class="ba-stat__icon">
        <slot name="icon" />
      </span>
      <span class="ba-stat__label">{{ label }}</span>
    </div>

    <strong class="ba-stat__value">{{ value }}</strong>
    <span v-if="hint" class="ba-stat__hint">{{ hint }}</span>
  </div>
</template>
