<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AlertVariant } from './types';

defineOptions({
  name: 'BaAlert'
});

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    variant?: AlertVariant;
    closable?: boolean;
  }>(),
  {
    title: '',
    description: '',
    variant: 'info',
    closable: false
  }
);

const emit = defineEmits<{
  close: [];
}>();

const visible = ref(true);

const alertClasses = computed(() => [
  'ba-alert',
  `ba-alert--${props.variant}`
]);

function closeAlert() {
  visible.value = false;
  emit('close');
}
</script>

<template>
  <div v-if="visible" :class="alertClasses">
    <div class="ba-alert__icon" aria-hidden="true"></div>

    <div class="ba-alert__content">
      <strong v-if="title" class="ba-alert__title">{{ title }}</strong>
      <p v-if="description || $slots.default" class="ba-alert__description">
        <slot>{{ description }}</slot>
      </p>
    </div>

    <button
      v-if="closable"
      type="button"
      class="ba-alert__close"
      aria-label="Close alert"
      @click="closeAlert"
    >
      &times;
    </button>
  </div>
</template>
