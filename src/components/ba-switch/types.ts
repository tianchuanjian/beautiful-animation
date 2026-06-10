export type SwitchSize = 'sm' | 'md' | 'lg';

export interface BaSwitchProps {
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
}
