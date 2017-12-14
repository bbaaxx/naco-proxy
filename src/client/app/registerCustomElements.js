import WcmdlButton from './wood/wcmdl-button';

const allElements = [WcmdlButton];

export default function registerCustomElements() {
  allElements.forEach(element => {
    if (!customElements.get(element.is)) {
      customElements.define(element.is, element);
    }
  });
}
