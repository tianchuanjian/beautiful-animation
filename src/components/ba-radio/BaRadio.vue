<script setup lang="ts">
import { computed, ref } from 'vue';
import type { RadioSize, RadioValue } from './types';

defineOptions({
  name: 'BaRadio'
});

const props = withDefaults(
  defineProps<{
    modelValue?: RadioValue | null;
    value?: RadioValue;
    label?: string;
    description?: string;
    disabled?: boolean;
    size?: RadioSize;
    name?: string;
    id?: string;
  }>(),
  {
    modelValue: null,
    value: true,
    label: '',
    description: '',
    disabled: false,
    size: 'md',
    name: '',
    id: ''
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: RadioValue];
  change: [value: RadioValue];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const isFocused = ref(false);
const isChecked = computed(() => props.modelValue === props.value);

const radioClasses = computed(() => [
  'ba-radio',
  `ba-radio--${props.size}`,
  {
    'is-checked': isChecked.value,
    'is-disabled': props.disabled,
    'is-focused': isFocused.value
  }
]);

function selectValue() {
  if (props.disabled || isChecked.value) {
    return;
  }

  emit('update:modelValue', props.value);
  emit('change', props.value);
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
  <label :class="radioClasses">
    <input
      :id="id || undefined"
      class="ba-radio__input"
      :name="name || undefined"
      type="radio"
      :checked="isChecked"
      :disabled="disabled"
      @change="selectValue"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span class="ba-radio__control" aria-hidden="true">
      <span class="ba-radio__dot"></span>
    </span>

    <span class="ba-radio__content">
      <span v-if="label" class="ba-radio__label">{{ label }}</span>
      <span v-if="description" class="ba-radio__description">{{ description }}</span>
    </span>
  </label>
</template>
