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
    let width = window.innerWidth;
    let height = window.innerHeight;
    // get drawing context
    const ctx = canvas.getContext('2d');
    // set canvas to window's dimentions
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    this.animate(ctx, requestAnimationFrame, width, height, 0, 0);
  };

  animate = (
    context: any,
    raf: any,
    width: number,
    height: number,
    xShift: number,
    yShift: number,
  ) => {
    //debugger;
    //context.clearRect(0, 0, width, height);
    console.log(context.constructor);

    const res = 10; // bigger numbers yield smaller squares
    const darkColor = '#eeeeee';
    const lightColor = '#ffffff';
    const length = width > height ? width / res : height / res;
    for (let x = 0; x < res; x++) {
      for (let y = 0; y < res; y++) {
        let nx = x * length;
        let ny = y * length;
        if (x % 2 == 0 && y % 2 == 0) {
          context.fillStyle = darkColor;
        }
        if (x % 2 == 0 && y % 2 == 1) {
          context.fillStyle = lightColor;
        }
        if (x % 2 == 1 && y % 2 == 0) {
          context.fillStyle = lightColor;
        }
        if (x % 2 == 1 && y % 2 == 1) {
          context.fillStyle = darkColor;
        }
        context.fillRect(nx + xShift, ny + yShift, length, length);
      }
    }

    raf(
      this.animate(context, raf, width, height, xShift + 0.01, yShift + 0.01),
    );
    /*setTimeout(
      this.animate(context, raf, width, height, xShift + 0.001, yShift + 0.001),
      30000,
    );*/
  };
}
