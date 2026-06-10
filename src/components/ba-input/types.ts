export type InputMode = 'text' | 'amount';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'success' | 'warning' | 'error';
export type InputAlign = 'left' | 'center' | 'right';

export interface BaInputProps {
  modelValue?: string | number | null;
  mode?: InputMode;
  decimalPlaces?: number;
  useThousandSeparator?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  label?: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  status?: InputStatus;
  size?: InputSize;
  align?: InputAlign;
  name?: string;
  id?: string;
  autocomplete?: string;
}
