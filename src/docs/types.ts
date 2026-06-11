export type TableRow = {
  name: string;
  type: string;
  default: string;
  description: string;
};

export type DocSection = 'guide' | 'components';
export type DocCategory = 'guide' | 'form' | 'display' | 'layout' | 'feedback' | 'navigation';
export type PagePath =
  | '/guide/getting-started'
  | '/components/input'
  | '/components/textarea'
  | '/components/select'
  | '/components/popover'
  | '/components/checkbox'
  | '/components/radio'
  | '/components/switch'
  | '/components/button'
  | '/components/badge'
  | '/components/tag'
  | '/components/avatar'
  | '/components/card'
  | '/components/divider'
  | '/components/alert'
  | '/components/progress'
  | '/components/skeleton'
  | '/components/empty'
  | '/components/stat'
  | '/components/breadcrumb'
  | '/components/tabs'
  | '/components/steps'
  | '/components/timeline';

export type ComponentPagePath = Exclude<PagePath, '/guide/getting-started'>;

export type DocPage = {
  title: string;
  path: PagePath;
  section: DocSection;
  category: DocCategory;
  summary: string;
  keywords: string[];
};

export type ComponentDoc = {
  description: string;
  usageCode: string;
  props: TableRow[];
  events?: TableRow[];
  slots?: TableRow[];
};
