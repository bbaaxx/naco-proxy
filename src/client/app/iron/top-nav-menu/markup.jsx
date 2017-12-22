// @flow
import Snabbdom from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

export default ([props: { className: string }, menuDom]: any[]) => (
  <nav className={`requestParmsInput ${props.classNames}`}>
    <ul className="navLinks">{menuDom.map(ele => <li>{ele}</li>)}</ul>
  </nav>
);
