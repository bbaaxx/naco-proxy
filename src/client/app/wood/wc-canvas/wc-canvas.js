import injectStyles from '../../redstone/helpers/custom-elements/injectStyles';
import styles from './styles.component.scss';

export default class WcCanvas extends HTMLElement {
  canvasElement: HTMLCanvasElement;
  shadowRoot: ShadowRoot | any;
  squareLen: number;
  darkColor: string;
  lightColor: string;
  attachShadow: ({ mode: ShadowRootMode }) => ShadowRoot;
  static get is(): string {
    return 'wc-canvas';
  }

  constructor() {
    super();
    ['squareLen', 'darkColor', 'lightColor'].forEach(
      item =>
        Object.defineProperty(this, item, {
          get: () => this.hasAttribute(item) && this.getAttribute(item),
          set: val =>
            (val && this.setAttribute(item, val)) || this.removeAttribute(item),
        }),
      this,
    );

    this.attachShadow({ mode: 'open' });
    this.canvasElement = document.createElement('canvas');
    this.shadowRoot.appendChild(injectStyles(styles));
    this.shadowRoot.appendChild(this.canvasElement);
  }

  // This method id called once the component is connected to the DOM
  connectedCallback() {
    const ctx = this.canvasElement.getContext('2d');
    // set canvas to window's dimentions
    ctx.canvas.width = this.canvasElement.width;
    ctx.canvas.height = this.canvasElement.height;
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    this.animate(
      ctx,
      requestAnimationFrame,
      this.canvasElement.width, //window.innerWidth
      this.canvasElement.height, //window.innerHeight
      0,
      0,
      this.squareLen, //20
      this.darkColor, //'#666'
      this.lightColor, //'#aaa'
    );
  }
  _upgradeProperty(prop: any) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  animate = (
    context: any,
    raf: any,
    width: number,
    height: number,
    xShift: number,
    yShift: number,
    square_len: number,
    dark_color: string,
    light_color: string,
  ) => {
    //debugger;
    //context.clearRect(0, 0, width, height);
    console.log(context.constructor);

    const length = width > height ? width / square_len : height / square_len;
    for (let x = 0; x < square_len; x++) {
      for (let y = 0; y < square_len; y++) {
        let nx = x * length;
        let ny = y * length;
        if (x % 2 == 0 && y % 2 == 0) {
          context.fillStyle = dark_color;
        }
        if (x % 2 == 0 && y % 2 == 1) {
          context.fillStyle = light_color;
        }
        if (x % 2 == 1 && y % 2 == 0) {
          context.fillStyle = light_color;
        }
        if (x % 2 == 1 && y % 2 == 1) {
          context.fillStyle = dark_color;
        }
        context.fillRect(nx + xShift, ny + yShift, length, length);
      }
    }

    /*raf(
      this.animate(context, raf, width, height, xShift + 0.01, yShift + 0.01),
    );
    setTimeout(
      this.animate(context, raf, width, height, xShift + 0.001, yShift + 0.001),
      30000,
    );*/
  };
}
