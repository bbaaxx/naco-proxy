// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

export default (
  [
    props: { className: string },
    state,
    keyInput,
    valInput,
    descInput,
    delButton,
  ]: any[],
) => (
  <div className={`requestParmsInput ${props.className}`}>
    <table className={`table`}>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{keyInput}</td>
          <td>{valInput}</td>
          <td>{descInput}</td>
          <td>{delButton}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
