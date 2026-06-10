<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SwitchSize } from './types';

defineOptions({
  name: 'BaSwitch'
});

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    loading?: boolean;
    size?: SwitchSize;
    label?: string;
    hint?: string;
    checkedText?: string;
    uncheckedText?: string;
    name?: string;
    id?: string;
  }>(),
  {
    modelValue: false,
    disabled: false,
    loading: false,
    size: 'md',
    label: '',
    hint: '',
    checkedText: 'On',
    uncheckedText: 'Off',
    name: '',
    id: ''
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const isFocused = ref(false);

const switchClasses = computed(() => [
  'ba-switch',
  `ba-switch--${props.size}`,
  {
    'is-checked': props.modelValue,
    'is-disabled': props.disabled,
    'is-focused': isFocused.value,
    'is-loading': props.loading
  }
]);

const currentText = computed(() => (props.modelValue ? props.checkedText : props.uncheckedText));
const isInteractive = computed(() => !props.disabled && !props.loading);

function toggleValue() {
  if (!isInteractive.value) {
    return;
  }

  const nextValue = !props.modelValue;
  emit('update:modelValue', nextValue);
  emit('change', nextValue);
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false;
  emit('blur', event);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  toggleValue();
}
</script>

<template>
  <div :class="switchClasses">
    <div class="ba-switch__row">
      <div v-if="label || hint" class="ba-switch__copy">
        <span v-if="label" class="ba-switch__label">{{ label }}</span>
        <span v-if="hint" class="ba-switch__hint">{{ hint }}</span>
      </div>

      <button
        :id="id || undefined"
        class="ba-switch__trigger"
        type="button"
        role="switch"
        :name="name || undefined"
        :aria-checked="modelValue"
        :aria-label="label || currentText"
        :aria-busy="loading"
        :disabled="disabled || loading"
        @click="toggleValue"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      >
        <span class="ba-switch__track">
          <span class="ba-switch__thumb">
            <span v-if="loading" class="ba-switch__spinner"></span>
          </span>
        </span>

        <span class="ba-switch__text">{{ currentText }}</span>
      </button>
    </div>
  </div>
</template>
