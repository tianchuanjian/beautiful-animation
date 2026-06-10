<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'BaSkeleton'
});

const props = withDefaults(
  defineProps<{
    rows?: number;
    animated?: boolean;
    avatar?: boolean;
  }>(),
  {
    rows: 3,
    animated: true,
    avatar: false
  }
);

const skeletonClasses = computed(() => [
  'ba-skeleton',
  {
    'is-animated': props.animated,
    'has-avatar': props.avatar
  }
]);

const rowIndexes = computed(() => Array.from({ length: props.rows }, (_, index) => index));
</script>

<template>
  <div :class="skeletonClasses">
    <span v-if="avatar" class="ba-skeleton__avatar"></span>

    <div class="ba-skeleton__rows">
      <span
        v-for="index in rowIndexes"
        :key="index"
        class="ba-skeleton__line"
        :class="{ 'is-short': index === rowIndexes.length - 1 }"
      ></span>
    </div>
  </div>
</template>
