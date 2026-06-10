<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SelectOption, SelectSize, SelectStatus, SelectValue } from './types';

defineOptions({
  name: 'BaSelect'
});

const props = withDefaults(
  defineProps<{
    modelValue?: SelectValue | null;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    hint?: string;
    status?: SelectStatus;
    size?: SelectSize;
    name?: string;
    id?: string;
  }>(),
  {
    modelValue: null,
    options: () => [],
    placeholder: '请选择',
    disabled: false,
    label: '',
    hint: '',
    status: 'default',
    size: 'md',
    name: '',
    id: ''
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: SelectValue | ''];
  change: [value: SelectValue | ''];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const isFocused = ref(false);

const selectClasses = computed(() => [
  'ba-select',
  `ba-select--${props.size}`,
  `ba-select--${props.status}`,
  {
    'is-focused': isFocused.value,
    'is-disabled': props.disabled
  }
]);

const selectValue = computed(() => {
  if (props.modelValue == null || props.modelValue === '') {
    return '';
  }

  return String(props.modelValue);
});

function resolveOptionValue(rawValue: string) {
  if (!rawValue) {
    return '';
  }

  const matched = props.options.find((option) => String(option.value) === rawValue);
  return matched ? matched.value : rawValue;
}

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const nextValue = resolveOptionValue(target.value);
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
</script>

<template>
  <label :class="selectClasses">
    <span v-if="label" class="ba-select__label">{{ label }}</span>

    <span class="ba-select__surface">
      <select
        :id="id || undefined"
        class="ba-select__field"
        :name="name || undefined"
        :value="selectValue"
        :disabled="disabled"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <option value="">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="String(option.value)"
          :value="String(option.value)"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <span class="ba-select__arrow" aria-hidden="true">⌄</span>
    </span>

    <span v-if="hint" class="ba-select__hint">{{ hint }}</span>
  </label>
</template>
