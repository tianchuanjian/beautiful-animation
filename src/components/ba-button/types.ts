export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonNativeType = 'button' | 'submit' | 'reset';

export interface BaButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  nativeType?: ButtonNativeType;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  round?: boolean;
}
