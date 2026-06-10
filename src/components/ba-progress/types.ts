export type ProgressStatus = 'default' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface BaProgressProps {
  modelValue?: number;
  status?: ProgressStatus;
  size?: ProgressSize;
  striped?: boolean;
  showLabel?: boolean;
}
