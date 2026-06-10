export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface BaCheckboxProps {
  modelValue?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
  name?: string;
  id?: string;
}
