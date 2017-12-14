// @flow
import Snabbdom from 'snabbdom-pragma';

import { VNode } from '@cycle/dom';

export default (
  [
    props: { className: string },
    state: { mode: string },
    validateBtn,
    sendBtn,
    urlInput,
    codeField,
    methodDropdown,
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
        <label>Parameters</label>
        {requestParmsInput}
      </div>
      <div>{codeField}</div>
      <div>
        {validateBtn}
        {sendBtn}
      </div>
    </form>
  </div>
);
