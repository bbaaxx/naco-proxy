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
  ]: any[],
) => (
  <div className={`configureRequestForm ${props.className}`}>
    <form className={`form-control`} noValidate>
      {methodDropdown}
      <label>
        Target URI:
        {urlInput}
      </label>
      <div>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{keyInput}</td>
              <td>{valInput}</td>
              <td>{descInput}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>{codeField}</div>
      {validateBtn}
    </form>
  </div>
);
