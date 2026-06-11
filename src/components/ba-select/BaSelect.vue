<script setup lang="ts">
import { computed, nextTick, ref, watch, type ComponentPublicInstance } from 'vue';
import BaPopover from '../ba-popover/BaPopover.vue';
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

const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const optionRefs = ref<Array<HTMLButtonElement | null>>([]);
const isFocused = ref(false);
const isOpen = ref(false);
const activeIndex = ref(-1);
const fallbackId = `ba-select-${Math.random().toString(36).slice(2, 10)}`;

const selectClasses = computed(() => [
  'ba-select',
  `ba-select--${props.size}`,
  `ba-select--${props.status}`,
  {
    'is-focused': isFocused.value,
    'is-disabled': props.disabled,
    'is-open': isOpen.value
  }
]);

const selectValue = computed(() => {
  if (props.modelValue == null || props.modelValue === '') {
    return '';
  }

  return String(props.modelValue);
});

const selectedIndex = computed(() => props.options.findIndex((option) => String(option.value) === selectValue.value));

const selectedOption = computed(() => {
  if (selectedIndex.value < 0) {
    return null;
  }

  return props.options[selectedIndex.value] ?? null;
});

const displayLabel = computed(() => selectedOption.value?.label ?? props.placeholder);
const inputId = computed(() => props.id || fallbackId);
const labelId = computed(() => `${inputId.value}-label`);
const listboxId = computed(() => `${inputId.value}-listbox`);
const activeOptionId = computed(() => (activeIndex.value >= 0 ? `${inputId.value}-option-${activeIndex.value}` : undefined));
const hiddenValue = computed(() => selectValue.value);

function syncActiveIndex() {
  if (!props.options.length) {
    activeIndex.value = -1;
    return;
  }

  if (selectedIndex.value >= 0 && !props.options[selectedIndex.value]?.disabled) {
    activeIndex.value = selectedIndex.value;
    return;
  }

  activeIndex.value = props.options.findIndex((option) => !option.disabled);
}

function scrollActiveOptionIntoView() {
  if (activeIndex.value < 0) {
    return;
  }

  optionRefs.value[activeIndex.value]?.scrollIntoView({
    block: 'nearest'
  });
}

function focusTrigger() {
  nextTick(() => {
    triggerRef.value?.focus({
      preventScroll: true
    });
  });
}

function openDropdown() {
  if (props.disabled) {
    return;
  }

  isOpen.value = true;
}

function closeDropdown() {
  isOpen.value = false;
}

function moveActive(step: number) {
  const enabledIndexes = props.options
    .map((option, index) => (!option.disabled ? index : -1))
    .filter((index) => index >= 0);

  if (!enabledIndexes.length) {
    activeIndex.value = -1;
    return;
  }

  const currentPosition = enabledIndexes.indexOf(activeIndex.value);
  const startPosition = currentPosition === -1 ? (step > 0 ? 0 : enabledIndexes.length - 1) : currentPosition;
  const nextPosition = (startPosition + step + enabledIndexes.length) % enabledIndexes.length;
  activeIndex.value = enabledIndexes[nextPosition] ?? -1;
}

function jumpToEdge(direction: 'start' | 'end') {
  const enabledIndexes = props.options
    .map((option, index) => (!option.disabled ? index : -1))
    .filter((index) => index >= 0);

  if (!enabledIndexes.length) {
    activeIndex.value = -1;
    return;
  }

  activeIndex.value = direction === 'start' ? enabledIndexes[0] : enabledIndexes[enabledIndexes.length - 1];
}

function selectOption(option: SelectOption) {
  if (option.disabled) {
    return;
  }

  emit('update:modelValue', option.value);
  emit('change', option.value);
  closeDropdown();
  focusTrigger();
}

function selectActiveOption() {
  if (activeIndex.value < 0) {
    return;
  }

  const option = props.options[activeIndex.value];
  if (!option || option.disabled) {
    return;
  }

  selectOption(option);
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  const relatedTarget = event.relatedTarget as Node | null;
  if (relatedTarget && rootRef.value?.contains(relatedTarget)) {
    return;
  }

  isFocused.value = false;
  closeDropdown();
  emit('blur', event);
}

function handleTriggerKeydown(event: KeyboardEvent) {
  if (props.disabled) {
    return;
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
        return;
      }
      moveActive(1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
        return;
      }
      moveActive(-1);
      break;
    case 'Home':
      if (!isOpen.value) {
        return;
      }
      event.preventDefault();
      jumpToEdge('start');
      break;
    case 'End':
      if (!isOpen.value) {
        return;
      }
      event.preventDefault();
      jumpToEdge('end');
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
        return;
      }
      selectActiveOption();
      break;
    case 'Escape':
      if (!isOpen.value) {
        return;
      }
      event.preventDefault();
      closeDropdown();
      break;
    case 'Tab':
      closeDropdown();
      break;
    default:
      break;
  }
}

function setOptionRef(element: Element | ComponentPublicInstance | null, index: number) {
  optionRefs.value[index] = element as HTMLButtonElement | null;
}

function setActiveOption(index: number) {
  if (props.options[index]?.disabled) {
    return;
  }

  activeIndex.value = index;
}

function isSelected(option: SelectOption) {
  return String(option.value) === selectValue.value;
}

watch(
  isOpen,
  (open) => {
    if (!open) {
      return;
    }

    syncActiveIndex();
    nextTick(scrollActiveOptionIntoView);
  }
);

watch(
  () => props.options,
  () => {
    optionRefs.value = [];
    syncActiveIndex();
  },
  {
    deep: true
  }
);

watch(activeIndex, () => {
  if (!isOpen.value) {
    return;
  }

  nextTick(scrollActiveOptionIntoView);
});
</script>

<template>
  <div ref="rootRef" :class="selectClasses">
    <span v-if="label" :id="labelId" class="ba-select__label">{{ label }}</span>

    <BaPopover v-model="isOpen" match-trigger-width class="ba-select__popover" :disabled="disabled">
      <template #trigger="{ isOpen: popoverOpen, toggle }">
        <button
          :id="inputId"
          ref="triggerRef"
          class="ba-select__surface"
          :class="{ 'is-open': popoverOpen, 'is-placeholder': !selectedOption }"
          type="button"
          role="combobox"
          :disabled="disabled"
          :aria-expanded="popoverOpen"
          aria-haspopup="listbox"
          :aria-label="label || displayLabel"
          :aria-labelledby="label ? labelId : undefined"
          :aria-controls="listboxId"
          :aria-activedescendant="popoverOpen ? activeOptionId : undefined"
          @click="toggle()"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleTriggerKeydown"
        >
          <span class="ba-select__value">{{ displayLabel }}</span>
          <span class="ba-select__arrow" aria-hidden="true">⌄</span>
        </button>
      </template>

      <div :id="listboxId" class="ba-select__panel" role="listbox" :aria-labelledby="label ? labelId : undefined">
        <button
          v-for="(option, index) in options"
          :id="`${inputId}-option-${index}`"
          :key="String(option.value)"
          :ref="(element) => setOptionRef(element, index)"
          class="ba-select__option"
          :class="{
            'is-active': activeIndex === index,
            'is-selected': isSelected(option),
            'is-disabled': option.disabled
          }"
          type="button"
          role="option"
          :disabled="option.disabled"
          :aria-selected="isSelected(option)"
          tabindex="-1"
          @mousedown.prevent
          @pointerenter="setActiveOption(index)"
          @click="selectOption(option)"
        >
          <span class="ba-select__option-label">{{ option.label }}</span>
          <span v-if="isSelected(option)" class="ba-select__option-check" aria-hidden="true">✓</span>
        </button>

        <div v-if="!options.length" class="ba-select__empty">No options</div>
      </div>
    </BaPopover>

    <input v-if="name" type="hidden" :name="name" :value="hiddenValue" />
    <span v-if="hint" class="ba-select__hint">{{ hint }}</span>
  </div>
</template>
