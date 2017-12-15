import WcmdlButton from './wood/wcmdl-button';
import WcCanvas from './wood/wc-canvas';

const allElements = [WcmdlButton, WcCanvas];

export default function registerCustomElements() {
  allElements.forEach(element => {
    if (!customElements.get(element.is)) {
      customElements.define(element.is, element);
    }
  });
}
