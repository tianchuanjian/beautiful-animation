export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface BaAlertProps {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  closable?: boolean;
}
