<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { TextareaResize, TextareaSize, TextareaStatus } from './types';

defineOptions({
  name: 'BaTextarea'
});

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    clearable?: boolean;
    label?: string;
    hint?: string;
    status?: TextareaStatus;
    size?: TextareaSize;
    name?: string;
    id?: string;
    rows?: number;
    autosize?: boolean;
    minRows?: number;
    maxRows?: number;
    maxLength?: number;
    showCount?: boolean;
    resize?: TextareaResize;
  }>(),
  {
    modelValue: '',
    placeholder: '',
    disabled: false,
    readonly: false,
    clearable: false,
    label: '',
    hint: '',
    status: 'default',
    size: 'md',
    name: '',
    id: '',
    rows: 4,
    autosize: false,
    minRows: 3,
    maxRows: 8,
    maxLength: undefined,
    showCount: false,
    resize: 'vertical'
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [value: string];
  change: [value: string];
  clear: [];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const isFocused = ref(false);
const innerValue = ref('');

function syncFromModel() {
  innerValue.value = props.modelValue ?? '';
}

watch(
  () => props.modelValue,
  () => {
    syncFromModel();
  },
  { immediate: true }
);

watch(
  () => [innerValue.value, props.autosize, props.minRows, props.maxRows, props.size] as const,
  () => {
    nextTick(() => {
      resizeTextarea();
    });
  }
);

const textareaClasses = computed(() => [
  'ba-textarea',
  `ba-textarea--${props.size}`,
  `ba-textarea--${props.status}`,
  {
    'is-focused': isFocused.value,
    'is-disabled': props.disabled
  }
]);

const shouldShowClear = computed(
  () => props.clearable && !props.disabled && !props.readonly && isFocused.value && innerValue.value.length > 0
);

const currentLength = computed(() => innerValue.value.length);

const resizeStyle = computed(() => ({ resize: props.resize }));

function emitValue(value: string) {
  emit('update:modelValue', value);
  emit('input', value);
}

function getRowHeight(element: HTMLTextAreaElement) {
  const style = window.getComputedStyle(element);
  const lineHeight = Number.parseFloat(style.lineHeight);

  if (Number.isFinite(lineHeight)) {
    return lineHeight;
  }

  return 24;
}

function resizeTextarea() {
  if (!props.autosize || !textareaRef.value) {
    return;
  }

  const textarea = textareaRef.value;
  const rowHeight = getRowHeight(textarea);
  const style = window.getComputedStyle(textarea);
  const paddingTop = Number.parseFloat(style.paddingTop) || 0;
  const paddingBottom = Number.parseFloat(style.paddingBottom) || 0;
  const borderTop = Number.parseFloat(style.borderTopWidth) || 0;
  const borderBottom = Number.parseFloat(style.borderBottomWidth) || 0;
  const verticalExtra = paddingTop + paddingBottom + borderTop + borderBottom;
  const minHeight = props.minRows * rowHeight + verticalExtra;
  const maxHeight = props.maxRows * rowHeight + verticalExtra;

  textarea.style.height = 'auto';

  const nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);

  textarea.style.height = `${nextHeight}px`;
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  innerValue.value = target.value;
  emitValue(target.value);
}

function handleChange() {
  emit('change', innerValue.value);
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false;
  emit('blur', event);
}

function clearValue() {
  innerValue.value = '';
  emitValue('');
  emit('clear');

  nextTick(() => {
    textareaRef.value?.focus();
    resizeTextarea();
  });
}
</script>

<template>
  <label :class="textareaClasses">
    <span v-if="label" class="ba-textarea__label">{{ label }}</span>

    <span class="ba-textarea__surface">
      <textarea
        :id="id || undefined"
        ref="textareaRef"
        class="ba-textarea__field"
        :style="resizeStyle"
        :name="name || undefined"
        :value="innerValue"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <button
        v-if="shouldShowClear"
        type="button"
        class="ba-textarea__clear"
        aria-label="Clear textarea"
        @mousedown.prevent
        @click="clearValue"
      >
        &times;
      </button>
    </span>

    <span class="ba-textarea__meta">
      <span v-if="hint" class="ba-textarea__hint">{{ hint }}</span>
      <span v-if="showCount" class="ba-textarea__count">
        {{ currentLength }}<template v-if="maxLength">/{{ maxLength }}</template>
      </span>
    </span>
  </label>
</template>
