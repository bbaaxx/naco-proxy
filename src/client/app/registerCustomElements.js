import WcmdlButton from './wood/wcmdl-button';
import WcCodeField from './wood/wc-code-field';

const allElements = [WcmdlButton, WcCodeField];

export default function registerCustomElements() {
  allElements.forEach(element => {
    if (!customElements.get(element.is)) {
      customElements.define(element.is, element);
    }
  });
}
