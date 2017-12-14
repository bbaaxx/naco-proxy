// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

export default (
  [props: { className: string }, newRequestButton, newCollectionButton]: any[],
) => (
  <div className={`requestParmsInput ${props.className}`}>
    <nav>
      <ul className="navLinks">
        <li>{newRequestButton}</li>
        <li>{newCollectionButton}</li>
      </ul>
    </nav>
  </div>
);
