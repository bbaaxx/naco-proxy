// @flow
import injectStyles from '../../redstone/helpers/custom-elements/injectStyles';
import styles from './styles.component.scss';

export default class WcCanvas extends HTMLElement {
  canvasElement: HTMLElement;
  shadowRoot: ShadowRoot | any;
  attachShadow: ({ mode: ShadowRootMode }) => ShadowRoot;

  static get is(): string {
    return 'wc-canvas';
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.canvasElement = document.createElement('canvas');
    this.shadowRoot.appendChild(injectStyles(styles));
    this.shadowRoot.appendChild(this.canvasElement);
    this.canvasLogic(this.canvasElement);
  }

  canvasLogic = (canvas: Object) => {
    console.log('Holi pozoli ', canvas);
    const ctx = canvas.getContext('2d');
    ctx.fillRect(10, 10, 100, 100);
    ctx.clearRect(15, 15, 100, 100);
    ctx.strokeRect(20, 20, 100, 100);
  };
}
