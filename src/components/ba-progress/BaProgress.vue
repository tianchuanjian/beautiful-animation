<script setup lang="ts">
import { computed } from 'vue';
import type { ProgressSize, ProgressStatus } from './types';

defineOptions({
  name: 'BaProgress'
});

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    status?: ProgressStatus;
    size?: ProgressSize;
    striped?: boolean;
    showLabel?: boolean;
  }>(),
  {
    modelValue: 0,
    status: 'default',
    size: 'md',
    striped: false,
    showLabel: true
  }
);

const progressClasses = computed(() => [
  'ba-progress',
  `ba-progress--${props.size}`,
  `ba-progress--${props.status}`,
  {
    'is-striped': props.striped
  }
]);

const normalizedValue = computed(() => Math.min(Math.max(props.modelValue, 0), 100));
const trackStyle = computed(() => ({ width: `${normalizedValue.value}%` }));
</script>

<template>
  <div :class="progressClasses">
    <div class="ba-progress__track">
      <div class="ba-progress__bar" :style="trackStyle"></div>
    </div>

    <span v-if="showLabel" class="ba-progress__label">{{ normalizedValue }}%</span>
  </div>
</template>
