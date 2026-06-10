export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarStatus = 'none' | 'online' | 'busy' | 'offline';

export interface BaAvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  shape?: AvatarShape;
  size?: AvatarSize;
  status?: AvatarStatus;
}
