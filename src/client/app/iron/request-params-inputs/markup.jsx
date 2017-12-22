// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

export default (
  [
    state: { className: string },
    keyInput: VNode,
    valueInput: VNode,
    deleteButton: VNode,
    descriptionInput: VNode,
  ]: any[],
) => (
  <tr>
    <td>{keyInput}</td>
    <td>{valueInput}</td>
    <td>{descriptionInput}</td>
    <td>{deleteButton}</td>
  </tr>
);
