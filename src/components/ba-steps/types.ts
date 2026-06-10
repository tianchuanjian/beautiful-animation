export interface StepItem {
  title: string;
  description?: string;
}

export interface BaStepsProps {
  modelValue?: number;
  items?: StepItem[];
}
