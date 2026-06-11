import type { App } from 'vue';
import './styles/index.css';
import BaButton from './components/ba-button/BaButton.vue';
import BaAlert from './components/ba-alert/BaAlert.vue';
import BaAvatar from './components/ba-avatar/BaAvatar.vue';
import BaBadge from './components/ba-badge/BaBadge.vue';
import BaBreadcrumb from './components/ba-breadcrumb/BaBreadcrumb.vue';
import BaCard from './components/ba-card/BaCard.vue';
import BaCheckbox from './components/ba-checkbox/BaCheckbox.vue';
import BaDivider from './components/ba-divider/BaDivider.vue';
import BaEmpty from './components/ba-empty/BaEmpty.vue';
import BaInput from './components/ba-input/BaInput.vue';
import BaPopover from './components/ba-popover/BaPopover.vue';
import BaProgress from './components/ba-progress/BaProgress.vue';
import BaRadio from './components/ba-radio/BaRadio.vue';
import BaSelect from './components/ba-select/BaSelect.vue';
import BaSkeleton from './components/ba-skeleton/BaSkeleton.vue';
import BaStat from './components/ba-stat/BaStat.vue';
import BaSteps from './components/ba-steps/BaSteps.vue';
import BaSwitch from './components/ba-switch/BaSwitch.vue';
import BaTag from './components/ba-tag/BaTag.vue';
import BaTabs from './components/ba-tabs/BaTabs.vue';
import BaTextarea from './components/ba-textarea/BaTextarea.vue';
import BaTimeline from './components/ba-timeline/BaTimeline.vue';

export type { AlertVariant, BaAlertProps } from './components/ba-alert/types';
export type { AvatarShape, AvatarSize, AvatarStatus, BaAvatarProps } from './components/ba-avatar/types';
export type { BaBadgeProps, BadgeSize, BadgeVariant } from './components/ba-badge/types';
export type { BaButtonProps, ButtonNativeType, ButtonSize, ButtonVariant } from './components/ba-button/types';
export type { BaBreadcrumbProps, BreadcrumbItem } from './components/ba-breadcrumb/types';
export type { BaCardProps, CardPadding, CardShadow } from './components/ba-card/types';
export type { BaCheckboxProps, CheckboxSize } from './components/ba-checkbox/types';
export type { BaDividerProps, DividerContentPosition, DividerDirection } from './components/ba-divider/types';
export type { BaEmptyProps, EmptySize } from './components/ba-empty/types';
export type { BaInputProps, InputAlign, InputMode, InputSize, InputStatus } from './components/ba-input/types';
export type { BaPopoverProps, PopoverPlacement } from './components/ba-popover/types';
export type { BaProgressProps, ProgressSize, ProgressStatus } from './components/ba-progress/types';
export type { BaRadioProps, RadioSize, RadioValue } from './components/ba-radio/types';
export type { BaSelectProps, SelectOption, SelectSize, SelectStatus, SelectValue } from './components/ba-select/types';
export type { BaSkeletonProps } from './components/ba-skeleton/types';
export type { BaStatProps, StatTrend } from './components/ba-stat/types';
export type { BaStepsProps, StepItem } from './components/ba-steps/types';
export type { BaSwitchProps, SwitchSize } from './components/ba-switch/types';
export type { BaTagProps, TagSize, TagVariant } from './components/ba-tag/types';
export type { BaTabsProps, TabItem, TabsValue } from './components/ba-tabs/types';
export type { BaTextareaProps, TextareaResize, TextareaSize, TextareaStatus } from './components/ba-textarea/types';
export type { BaTimelineProps, TimelineItem, TimelineStatus } from './components/ba-timeline/types';
export { BaAlert };
export { BaAvatar };
export { BaBadge };
export { BaButton };
export { BaBreadcrumb };
export { BaCard };
export { BaCheckbox };
export { BaDivider };
export { BaEmpty };
export { BaInput };
export { BaPopover };
export { BaProgress };
export { BaRadio };
export { BaSelect };
export { BaSkeleton };
export { BaStat };
export { BaSteps };
export { BaSwitch };
export { BaTag };
export { BaTabs };
export { BaTextarea };
export { BaTimeline };

const components = [
  BaAlert,
  BaAvatar,
  BaBadge,
  BaBreadcrumb,
  BaButton,
  BaCard,
  BaCheckbox,
  BaDivider,
  BaEmpty,
  BaInput,
  BaPopover,
  BaProgress,
  BaRadio,
  BaSelect,
  BaSkeleton,
  BaStat,
  BaSteps,
  BaSwitch,
  BaTabs,
  BaTag,
  BaTextarea,
  BaTimeline
];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name ?? 'BaComponent', component);
    });
  }
};
