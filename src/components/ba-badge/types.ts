export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'ghost';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BaBadgeProps {
  value?: number | string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  max?: number;
}
