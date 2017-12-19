import injectStyles from '../../redstone/helpers/custom-elements/injectStyles';
import styles from './styles.component.scss';

export default class WcCanvas extends HTMLElement {
  canvasElement: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  shadowRoot: ShadowRoot | any;
  squareLen: number;
  darkColor: string;
  heigth: number;
  width: number;
  lightColor: string;
  attachShadow: ({ mode: ShadowRootMode }) => ShadowRoot;

  static get is(): string {
    return 'wc-canvas';
  }

  constructor() {
    super();
    [
      { attr: 'square-len', prop: 'squareLen' },
      { attr: 'dark-color', prop: 'darkColor' },
      { attr: 'light-color', prop: 'lightColor' },
      { attr: 'heigth', prop: 'heigth' },
      { attr: 'width', prop: 'width' },
    ].forEach(
      item =>
        Object.defineProperty(this, item.prop, {
          get: () =>
            this.hasAttribute(item.attr) && this.getAttribute(item.attr),
          set: val =>
            (val && this.setAttribute(item.attr, val)) ||
            this.removeAttribute(item.attr),
        }),
      this,
    );

    this.raf =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    this.attachShadow({ mode: 'open' });
    this.canvasElement = document.createElement('canvas');
    this.shadowRoot.appendChild(injectStyles(styles));
    this.shadowRoot.appendChild(this.canvasElement);
  }

  // This method id called once the component is connected to the DOM
  connectedCallback() {
    this.canvasContext = this.canvasElement.getContext('2d');

    // REVIEW: set canvas to window's dimentions
    this.canvasContext.canvas.width = window.innerWidth;
    this.canvasContext.canvas.height = window.innerHeight;

    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    this.animate(0, 0);
  }

  _upgradeProperty(prop: any) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  animate = (xShift: number, yShift: number) => {
    const { width, height } = this.canvasElement;
    const length =
      width > height ? width / this.squareLen : height / this.squareLen;
    for (let x = 0; x < this.squareLen; x++) {
      for (let y = 0; y < this.squareLen; y++) {
        let nx = x * length;
        let ny = y * length;
        if (x % 2 == 0 && y % 2 == 0) {
          this.canvasContext.fillStyle = this.darkColor;
        }
        if (x % 2 == 0 && y % 2 == 1) {
          this.canvasContext.fillStyle = this.lightColor;
        }
        if (x % 2 == 1 && y % 2 == 0) {
          this.canvasContext.fillStyle = this.lightColor;
        }
        if (x % 2 == 1 && y % 2 == 1) {
          this.canvasContext.fillStyle = this.darkColor;
        }
        this.canvasContext.fillRect(nx + xShift, ny + yShift, length, length);
      }
    }

    // this.raf(this.animate(xShift + 0.01, yShift + 0.01));
    // setTimeout(this.animate(xShift + 0.001, yShift + 0.001), 30000);
  };
}
