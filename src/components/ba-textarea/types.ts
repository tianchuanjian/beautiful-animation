export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaStatus = 'default' | 'success' | 'warning' | 'error';
export type TextareaResize = 'none' | 'vertical' | 'both';

export interface BaTextareaProps {
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
}
