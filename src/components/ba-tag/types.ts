export type TagVariant = 'primary' | 'success' | 'warning' | 'danger' | 'ghost';
export type TagSize = 'sm' | 'md' | 'lg';

export interface BaTagProps {
  variant?: TagVariant;
  size?: TagSize;
  closable?: boolean;
  round?: boolean;
  pulse?: boolean;
}
