export type TimelineStatus = 'default' | 'success' | 'warning' | 'error';

export interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
  status?: TimelineStatus;
}

export interface BaTimelineProps {
  items?: TimelineItem[];
}
