// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

export default ([state: { className: string }, paramsList: VNode]: (
  | { className: string }
  | VNode
)[]) => (
  <div className={`requestParmsInput ${state.className}`}>
    <table className={`table`}>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{paramsList}</tbody>
    </table>
  </div>
);
