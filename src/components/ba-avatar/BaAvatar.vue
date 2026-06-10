<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { AvatarShape, AvatarSize, AvatarStatus } from './types';

defineOptions({
  name: 'BaAvatar'
});

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    initials?: string;
    shape?: AvatarShape;
    size?: AvatarSize;
    status?: AvatarStatus;
  }>(),
  {
    src: '',
    alt: '',
    initials: '',
    shape: 'circle',
    size: 'md',
    status: 'none'
  }
);

const hasImageError = ref(false);

watch(
  () => props.src,
  () => {
    hasImageError.value = false;
  }
);

const avatarClasses = computed(() => [
  'ba-avatar',
  `ba-avatar--${props.size}`,
  `ba-avatar--${props.shape}`,
  {
    'has-status': props.status !== 'none'
  }
]);

const displayInitials = computed(() => {
  if (props.initials) {
    return props.initials.slice(0, 2).toUpperCase();
  }

  return 'BA';
});

const showImage = computed(() => Boolean(props.src) && !hasImageError.value);

function handleError() {
  hasImageError.value = true;
}
</script>

<template>
  <span :class="avatarClasses">
    <img
      v-if="showImage"
      class="ba-avatar__image"
      :src="src"
      :alt="alt || displayInitials"
      @error="handleError"
    />

    <span v-else class="ba-avatar__fallback">{{ displayInitials }}</span>

    <span v-if="status !== 'none'" :class="['ba-avatar__status', `is-${status}`]"></span>
  </span>
</template>
