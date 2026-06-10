export type StatTrend = 'up' | 'down' | 'neutral';

export interface BaStatProps {
  label?: string;
  value?: number | string;
  hint?: string;
  trend?: StatTrend;
}
