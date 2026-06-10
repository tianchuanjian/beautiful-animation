import type { App } from 'vue';
import './styles/index.css';
import BaButton from './components/ba-button/BaButton.vue';
import BaInput from './components/ba-input/BaInput.vue';

export type { BaButtonProps, ButtonNativeType, ButtonSize, ButtonVariant } from './components/ba-button/types';
export type { BaInputProps, InputAlign, InputMode, InputSize, InputStatus } from './components/ba-input/types';
export { BaButton };
export { BaInput };

const components = [BaButton, BaInput];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name ?? 'BaComponent', component);
    });
  }
};
