// @flow
import Snabbdom from 'snabbdom-pragma';

import { VNode } from '@cycle/dom';

export default (
  [
    props: { className: string },
    state: { mode: string },
    validateBtn,
    urlInput,
    codeField,
    methodDropdown,
    keyInput,
    valInput,
    descInput,
    requestParmsInput,
  ]: any[],
) => (
  <div className={`configureRequestForm ${props.className}`}>
    <form className={`form-control`} noValidate>
      {methodDropdown}
      <label>
        Target URI:
        {urlInput}
      </label>
      <div className={`table-responsive`}>
        <label>Parameters Comp</label>
        {requestParmsInput}
      </div>
      <div>{codeField}</div>
      <div>
        {validateBtn}
        {validateBtn}
      </div>
    </form>
  </div>
);
