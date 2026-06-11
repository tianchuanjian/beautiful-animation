export type PopoverPlacement = 'bottom-start' | 'bottom-end';

export interface BaPopoverProps {
  modelValue?: boolean;
  placement?: PopoverPlacement;
  offset?: number;
  disabled?: boolean;
  closeOnOutside?: boolean;
  closeOnEscape?: boolean;
  matchTriggerWidth?: boolean;
  teleportTo?: string;
  zIndex?: number;
}
