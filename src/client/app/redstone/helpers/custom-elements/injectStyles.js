// @flow
/* global document */
export default function injectStyles(styles) {
  const stylesElement = document.createElement('style');
  stylesElement.innerText = styles.toString();
  return stylesElement;
}
