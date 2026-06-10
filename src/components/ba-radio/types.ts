export type RadioValue = boolean | number | string;
export type RadioSize = 'sm' | 'md' | 'lg';

export interface BaRadioProps {
  modelValue?: RadioValue | null;
  value?: RadioValue;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: RadioSize;
  name?: string;
  id?: string;
}
