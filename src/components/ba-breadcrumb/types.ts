export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
}

export interface BaBreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: string;
}
