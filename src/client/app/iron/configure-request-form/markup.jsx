// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';
console.log(VNode);
export default (
  [
    props: { className: string },
    state: { mode: string },
    validateBtn,
    urlInput,
    codeField,
    methodDropdown,
  ]: any[],
) => (
  <div className={`configureRequestForm ${props.className}`}>
    <form className={`form-control`} noValidate>
      {methodDropdown}
      <label>
        Target URI:
        {urlInput}
      </label>
      {validateBtn}
      <div>{codeField}</div>
    </form>
  </div>
);
