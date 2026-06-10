export type CardShadow = 'always' | 'hover' | 'never';
export type CardPadding = 'sm' | 'md' | 'lg';

export interface BaCardProps {
  title?: string;
  description?: string;
  shadow?: CardShadow;
  padding?: CardPadding;
  interactive?: boolean;
}
