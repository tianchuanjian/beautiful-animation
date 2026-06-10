<script setup lang="ts">
import { computed } from 'vue';
import type { BadgeSize, BadgeVariant } from './types';

defineOptions({
  name: 'BaBadge'
});

const props = withDefaults(
  defineProps<{
    value?: number | string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
    pulse?: boolean;
    max?: number;
  }>(),
  {
    value: '',
    variant: 'primary',
    size: 'md',
    dot: false,
    pulse: false,
    max: 99
  }
);

const badgeClasses = computed(() => [
  'ba-badge',
  `ba-badge--${props.variant}`,
  `ba-badge--${props.size}`,
  {
    'is-dot': props.dot,
    'is-pulse': props.pulse
  }
]);

const displayValue = computed(() => {
  if (typeof props.value === 'number' && props.value > props.max) {
    return `${props.max}+`;
  }

  return props.value;
});
</script>

<template>
  <span :class="badgeClasses">
    <span v-if="!dot" class="ba-badge__value">{{ displayValue }}</span>
  </span>
</template>
