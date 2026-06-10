<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CheckboxSize } from './types';

defineOptions({
  name: 'BaCheckbox'
});

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    description?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    size?: CheckboxSize;
    name?: string;
    id?: string;
  }>(),
  {
    modelValue: false,
    label: '',
    description: '',
    disabled: false,
    indeterminate: false,
    size: 'md',
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

const checkboxClasses = computed(() => [
  'ba-checkbox',
  `ba-checkbox--${props.size}`,
  {
    'is-checked': props.modelValue,
    'is-disabled': props.disabled,
    'is-focused': isFocused.value,
    'is-indeterminate': props.indeterminate
  }
]);

const ariaChecked = computed(() => (props.indeterminate ? 'mixed' : props.modelValue));

function toggleValue() {
  if (props.disabled) {
    return;
  }

  const nextValue = !props.modelValue;
  emit('update:modelValue', nextValue);
  emit('change', nextValue);
}

function handleChange() {
  toggleValue();
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
  <label :class="checkboxClasses">
    <input
      :id="id || undefined"
      class="ba-checkbox__input"
      :name="name || undefined"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="ariaChecked"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span class="ba-checkbox__control" aria-hidden="true">
      <span v-if="indeterminate" class="ba-checkbox__line"></span>
      <span v-else class="ba-checkbox__check"></span>
    </span>

    <span class="ba-checkbox__content">
      <span v-if="label" class="ba-checkbox__label">{{ label }}</span>
      <span v-if="description" class="ba-checkbox__description">{{ description }}</span>
    </span>
  </label>
</template>
