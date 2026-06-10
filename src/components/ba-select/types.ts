export type SelectValue = number | string;
export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectStatus = 'default' | 'success' | 'warning' | 'error';

export interface SelectOption {
  label: string;
  value: SelectValue;
  disabled?: boolean;
}

export interface BaSelectProps {
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
}
