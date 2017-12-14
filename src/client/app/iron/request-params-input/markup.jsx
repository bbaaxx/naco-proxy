// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

export default (
  [props: { className: string }, state, keyInput, valInput, descInput]: any[],
) => (
  <div className={`requestParmsInput ${props.className}`}>
    <table className={`table`}>
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
);
