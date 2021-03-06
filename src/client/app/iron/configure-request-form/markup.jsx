// @flow
import Snabbdom from 'snabbdom-pragma';

import { VNode } from '@cycle/dom';

export default ([
  props: { className: string },
  state: { mode: string },
  validateBtn,
  sendBtn,
  urlInput,
  codeField,
  methodDropdown,
  requestParmsInput,
]: any[]) => (
  <div className={`configureRequestForm ${props.className}`}>
    <form className={`form-control`} noValidate>
      <div className={`meth-uri`}>
        {methodDropdown}
        {urlInput}
      </div>
      <div className={`table-responsive`}>
        {/* REVIEW: not sure if this should be a label */}
        <label>Parameters</label>
        {requestParmsInput}
      </div>
      <div className={`codeField`}>{codeField}</div>
      <div className={`buttons`}>
        {validateBtn}
        {sendBtn}
      </div>
    </form>
  </div>
);
