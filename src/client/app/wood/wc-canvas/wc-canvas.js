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
  }

  // This method id called once the component is connected to the DOM
  connectedCallback() {
    Object.defineProperty(
      this,
      width,
      height,
      square_len,
      dark_color,
      light_color,
      {
        get: () => this.hasAttribute(width) && this.getAttribute(width),
        set: val =>
          (val && this.setAttribute(width, val)) || this.removeAttribute(width),
        get: () => this.hasAttribute(height) && this.getAttribute(height),
        set: val =>
          (val && this.setAttribute(height, val)) ||
          this.removeAttribute(height),
        get: () =>
          this.hasAttribute(square_len) && this.getAttribute(square_len),
        set: val =>
          (val && this.setAttribute(square_len, val)) ||
          this.removeAttribute(square_len),
        get: () =>
          this.hasAttribute(dark_color) && this.getAttribute(dark_color),
        set: val =>
          (val && this.setAttribute(dark_color, val)) ||
          this.removeAttribute(dark_color),
        get: () =>
          this.hasAttribute(light_color) && this.getAttribute(light_color),
        set: val =>
          (val && this.setAttribute(light_color, val)) ||
          this.removeAttribute(light_color),
      },
    );

    const ctx = this.canvasElement.getContext('2d');
    // set canvas to window's dimentions
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    this.animate(
      ctx,
      requestAnimationFrame,
      this.width, //window.innerWidth
      this.height, //window.innerHeight
      0,
      0,
      this.square_len, //20
      this.dark_color, //'#666'
      this.light_color, //'#aaa'
    );
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
