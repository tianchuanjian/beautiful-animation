<script setup lang="ts">
import { computed } from 'vue';
import type { TabItem, TabsValue } from './types';

defineOptions({
  name: 'BaTabs'
});

const props = withDefaults(
  defineProps<{
    modelValue?: TabsValue;
    items?: TabItem[];
  }>(),
  {
    modelValue: '',
    items: () => []
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: TabsValue];
  change: [value: TabsValue];
}>();

const currentValue = computed(() => {
  if (props.modelValue !== '') {
    return props.modelValue;
  }

  return props.items[0]?.value ?? '';
});

const currentItem = computed(() => props.items.find((item) => item.value === currentValue.value) ?? null);

function selectTab(item: TabItem) {
  if (item.disabled || item.value === currentValue.value) {
    return;
  }

  emit('update:modelValue', item.value);
  emit('change', item.value);
}
</script>

<template>
  <div class="ba-tabs">
    <div class="ba-tabs__nav" role="tablist">
      <button
        v-for="item in items"
        :key="String(item.value)"
        class="ba-tabs__tab"
        :class="{ 'is-active': currentValue === item.value, 'is-disabled': item.disabled }"
        type="button"
        role="tab"
        :aria-selected="currentValue === item.value"
        :disabled="item.disabled"
        @click="selectTab(item)"
      >
        <span>{{ item.label }}</span>
        <span v-if="item.badge !== undefined" class="ba-tabs__badge">{{ item.badge }}</span>
      </button>
    </div>

    <div class="ba-tabs__panel" role="tabpanel">
      <slot :item="currentItem" :value="currentValue" />
    </div>
  </div>
</template>
