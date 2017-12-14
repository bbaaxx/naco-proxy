// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

export default (
  [
    props: { className: string },
    allRequestsButton,
    newRequestButton,
    newCollectionButton,
  ]: any[],
) => (
  <nav className={`requestParmsInput ${props.classNames}`}>
    <ul className="navLinks">
      <li>{allRequestsButton}</li>
      <li>{newRequestButton}</li>
      <li>{newCollectionButton}</li>
    </ul>
  </nav>
);
