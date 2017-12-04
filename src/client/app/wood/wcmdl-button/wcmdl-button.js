// @flow
import Hammer from 'hammerjs';
import componentHandler from 'material-design-lite/material';

import injectStyles from '../../redstone/helpers/custom-elements/injectStyles';
import styles from './styles.scss';

export default class WcmdlButton extends HTMLElement {
  BOOLEAN_PROPERTIES = [
    'accent',
    'colored',
    'fab',
    'mini',
    'primary',
    'raised',
    'ripple',
  ];
  STRING_PROPERTIES = ['name', 'icon'];

  static get is() {
    return 'wcmdl-button';
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.BOOLEAN_PROPERTIES.forEach(
      item =>
        Object.defineProperty(this, item, {
          get: () => this.hasAttribute(item),
          set: val =>
            (val && this.setAttribute(item, '')) || this.removeAttribute(item),
        }),
      this,
    );

    this.STRING_PROPERTIES.forEach(
      item =>
        Object.defineProperty(this, item, {
          get: () => this.hasAttribute(item) && this.getAttribute(item),
          set: val =>
            (val && this.setAttribute(item, val)) || this.removeAttribute(item),
        }),
      this,
    );
  }

  connectedCallback() {
    this.updateButton();
  }

  disconnectCallback() {
    this.hammerManager.off('tap');
  }

  dispatch(evt) {
    evt.preventDefault();
    this.buttonElement.dispatchEvent(
      new Event('wcmdl-button-clicked', { composed: true }),
    );
  }

  updateButton() {
    this.generateButtonElement();

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(injectStyles(styles));
    this.shadowRoot.appendChild(this.buttonElement);
    componentHandler.upgradeElement(this.buttonElement);
  }

  generateButtonElement() {
    const button = document.createElement('button');
    const classList = ['wcmdl-button', 'mdl-button', 'mdl-js-button'];
    button.innerHTML = '<slot>button</slot>';
    if (!this.name) {
      button.name = 'default-wcmdl-button';
    }

    if (this.raised) {
      classList.push('mdl-button--raised');
    }
    if (this.ripple) {
      classList.push('mdl-js-ripple-effect');
    }
    if (this.accent) {
      classList.push('mdl-button--accent');
    }
    if (this.colored) {
      classList.push('mdl-button--colored');
    }
    if (this.primary) {
      classList.push('mdl-button--primary');
    }
    if (this.icon) {
      classList.push('mdl-button--icon');
      button.innerHTML = `<i class="material-icons">${this.icon}</i>`;
    }
    if (this.fab) {
      classList.push('mdl-button--fab');
    }
    if (this.mini) {
      classList.push('mdl-button--mini-fab');
    }

    button.classList.add(...classList);
    this.hammerManager = new Hammer(button);
    this.hammerManager.on('tap', this.dispatch.bind(this));
    this.buttonElement = button;
  }
}
