<script setup lang="ts">
import { computed } from 'vue';
import type { DividerContentPosition, DividerDirection } from './types';

defineOptions({
  name: 'BaDivider'
});

const props = withDefaults(
  defineProps<{
    direction?: DividerDirection;
    dashed?: boolean;
    contentPosition?: DividerContentPosition;
  }>(),
  {
    direction: 'horizontal',
    dashed: false,
    contentPosition: 'center'
  }
);

const dividerClasses = computed(() => [
  'ba-divider',
  `ba-divider--${props.direction}`,
  `ba-divider--${props.contentPosition}`,
  {
    'is-dashed': props.dashed
  }
]);
</script>

<template>
  <div :class="dividerClasses" role="separator">
    <span v-if="$slots.default" class="ba-divider__content">
      <slot />
    </span>
  </div>
</template>
