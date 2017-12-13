// @flow
import * as Snabbdom from 'snabbdom-pragma';
import { DOMSource, VNode } from '@cycle/dom';
import { Stream } from 'xstream';
import './styles.scss';

/** convert a style object to a CSS class name */

export default function(sources: { DOM: Stream, props$: Stream }) {
  const { props$ } = sources;
  const clicks$ = sources.DOM.select('button').events('click');
  const vdom$ = props$.map(props => (
    <button
      className={`cy-button ${props.classNames || ''}`}
      type={props.type || 'button'}
    >
      {props.text}
    </button>
  ));

  return { DOM: vdom$, clicks$ };
}
