<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { PopoverPlacement } from './types';

defineOptions({
  name: 'BaPopover'
});

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    placement?: PopoverPlacement;
    offset?: number;
    disabled?: boolean;
    closeOnOutside?: boolean;
    closeOnEscape?: boolean;
    matchTriggerWidth?: boolean;
    teleportTo?: string;
    zIndex?: number;
  }>(),
  {
    modelValue: false,
    placement: 'bottom-start',
    offset: 12,
    disabled: false,
    closeOnOutside: true,
    closeOnEscape: true,
    matchTriggerWidth: false,
    teleportTo: 'body',
    zIndex: 1200
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  open: [];
  close: [];
}>();

const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const triggerWidth = ref(0);
const isPositionReady = ref(false);
const panelStyle = ref<Record<string, string>>({});
let frameId = 0;

const popoverClasses = computed(() => [
  'ba-popover',
  `ba-popover--${props.placement}`,
  {
    'is-open': props.modelValue,
    'is-disabled': props.disabled
  }
]);

function emitOpenState(nextValue: boolean) {
  if (props.disabled && nextValue) {
    return;
  }

  if (props.modelValue === nextValue) {
    return;
  }

  emit('update:modelValue', nextValue);
  if (nextValue) {
    emit('open');
    return;
  }

  emit('close');
}

function open() {
  emitOpenState(true);
}

function close() {
  emitOpenState(false);
}

function toggle() {
  emitOpenState(!props.modelValue);
}

function syncTriggerWidth() {
  triggerWidth.value = triggerRef.value?.offsetWidth ?? 0;
}

function syncPanelPosition() {
  const trigger = triggerRef.value;
  if (!trigger || !props.modelValue) {
    return;
  }

  const rect = trigger.getBoundingClientRect();
  const panelWidth = props.matchTriggerWidth ? rect.width : (panelRef.value?.offsetWidth ?? rect.width);
  const panelHeight = panelRef.value?.offsetHeight ?? 0;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const edgePadding = 16;

  let left = props.placement === 'bottom-end' ? rect.right - panelWidth : rect.left;
  left = Math.min(Math.max(left, edgePadding), Math.max(edgePadding, viewportWidth - panelWidth - edgePadding));

  let top = rect.bottom + props.offset;
  let originY = 'top';

  if (panelHeight > 0 && top + panelHeight > viewportHeight - edgePadding) {
    const nextTop = rect.top - props.offset - panelHeight;
    if (nextTop >= edgePadding) {
      top = nextTop;
      originY = 'bottom';
    }
  }

  top = Math.max(edgePadding, top);

  panelStyle.value = {
    left: `${left}px`,
    top: `${top}px`,
    zIndex: String(props.zIndex),
    visibility: isPositionReady.value ? 'visible' : 'hidden',
    '--ba-popover-origin': `${props.placement === 'bottom-end' ? 'right' : 'left'} ${originY}`
  };

  if (props.matchTriggerWidth && triggerWidth.value > 0) {
    panelStyle.value.minWidth = `${triggerWidth.value}px`;
  }
}

function requestPanelPositionSync() {
  cancelAnimationFrame(frameId);
  frameId = window.requestAnimationFrame(() => {
    syncPanelPosition();
  });
}

function handleDocumentPointerdown(event: PointerEvent) {
  if (!props.modelValue || !props.closeOnOutside) {
    return;
  }

  const target = event.target as Node | null;
  if (target && (rootRef.value?.contains(target) || panelRef.value?.contains(target))) {
    return;
  }

  close();
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (!props.modelValue || !props.closeOnEscape || event.key !== 'Escape') {
    return;
  }

  close();
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) {
      isPositionReady.value = false;
      return;
    }

    nextTick(() => {
      syncTriggerWidth();
      syncPanelPosition();
      isPositionReady.value = true;
      syncPanelPosition();
      requestPanelPositionSync();
    });
  }
);

onMounted(() => {
  syncTriggerWidth();
  window.addEventListener('resize', syncTriggerWidth);
  window.addEventListener('resize', requestPanelPositionSync);
  window.addEventListener('scroll', requestPanelPositionSync, true);
  document.addEventListener('pointerdown', handleDocumentPointerdown);
  document.addEventListener('keydown', handleDocumentKeydown);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
  window.removeEventListener('resize', syncTriggerWidth);
  window.removeEventListener('resize', requestPanelPositionSync);
  window.removeEventListener('scroll', requestPanelPositionSync, true);
  document.removeEventListener('pointerdown', handleDocumentPointerdown);
  document.removeEventListener('keydown', handleDocumentKeydown);
});

defineExpose({
  open,
  close,
  toggle
});
</script>

<template>
  <div ref="rootRef" :class="popoverClasses">
    <div ref="triggerRef" class="ba-popover__trigger">
      <slot name="trigger" :is-open="modelValue" :open="open" :close="close" :toggle="toggle" />
    </div>

    <Teleport :to="teleportTo">
      <Transition name="ba-popover-fade">
        <div v-if="modelValue" ref="panelRef" class="ba-popover__content" :style="panelStyle">
          <slot :is-open="modelValue" :open="open" :close="close" :toggle="toggle" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
