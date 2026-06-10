<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonNativeType, ButtonSize, ButtonVariant } from './types';

defineOptions({
  name: 'BaButton'
});

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    nativeType?: ButtonNativeType;
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
    round?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    nativeType: 'button',
    disabled: false,
    loading: false,
    block: false,
    round: false
  }
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const classes = computed(() => [
  'ba-button',
  `ba-button--${props.variant}`,
  `ba-button--${props.size}`,
  {
    'is-loading': props.loading,
    'is-block': props.block,
    'is-round': props.round
  }
]);

const isDisabled = computed(() => props.disabled || props.loading);

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }

  emit('click', event);
}
</script>

<template>
  <button
    :class="classes"
    :type="nativeType"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="loading" class="ba-button__spinner" aria-hidden="true"></span>

    <span v-if="$slots.prefix" class="ba-button__icon ba-button__icon--prefix">
      <slot name="prefix" />
    </span>

    <span class="ba-button__label">
      <slot />
    </span>

    <span v-if="$slots.suffix" class="ba-button__icon ba-button__icon--suffix">
      <slot name="suffix" />
    </span>
  </button>
</template>
