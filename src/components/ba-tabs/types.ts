export type TabsValue = number | string;

export interface TabItem {
  label: string;
  value: TabsValue;
  disabled?: boolean;
  badge?: string | number;
}

export interface BaTabsProps {
  modelValue?: TabsValue;
  items?: TabItem[];
}
