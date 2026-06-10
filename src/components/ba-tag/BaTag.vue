<script setup lang="ts">
import { computed } from 'vue';
import type { TagSize, TagVariant } from './types';

defineOptions({
  name: 'BaTag'
});

const props = withDefaults(
  defineProps<{
    variant?: TagVariant;
    size?: TagSize;
    closable?: boolean;
    round?: boolean;
    pulse?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    closable: false,
    round: false,
    pulse: false
  }
);

const emit = defineEmits<{
  click: [event: MouseEvent];
  close: [event: MouseEvent];
}>();

const tagClasses = computed(() => [
  'ba-tag',
  `ba-tag--${props.variant}`,
  `ba-tag--${props.size}`,
  {
    'is-round': props.round,
    'is-pulse': props.pulse
  }
]);

function handleClick(event: MouseEvent) {
  emit('click', event);
}

function handleClose(event: MouseEvent) {
  event.stopPropagation();
  emit('close', event);
}
</script>

<template>
  <span :class="tagClasses" @click="handleClick">
    <span v-if="$slots.dot" class="ba-tag__dot">
      <slot name="dot" />
    </span>

    <span class="ba-tag__label">
      <slot />
    </span>

    <button
      v-if="closable"
      type="button"
      class="ba-tag__close"
      aria-label="Close tag"
      @click="handleClose"
    >
      &times;
    </button>
  </span>
</template>
