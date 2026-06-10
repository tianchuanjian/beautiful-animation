export type DividerDirection = 'horizontal' | 'vertical';
export type DividerContentPosition = 'start' | 'center' | 'end';

export interface BaDividerProps {
  direction?: DividerDirection;
  dashed?: boolean;
  contentPosition?: DividerContentPosition;
}
