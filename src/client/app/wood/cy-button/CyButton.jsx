// @flow
import * as Snabbdom from 'snabbdom-pragma';
import { DOMSource, VNode } from '@cycle/dom';
import { Stream } from 'xstream';
import { style } from 'typestyle';

/** convert a style object to a CSS class name */
const styleClass = style({ color: 'red' });

export default function(sources: { DOM: Stream, props$: Stream }) {
  const { props$ } = sources;
  const clicks$ = sources.DOM.select('button').events('click');
  const vdom$ = props$.map(props => (
    <button
      className={`cy-button ${styleClass} ${props.classNames || ''}`}
      type={props.type || 'button'}
    >
      {props.text}
    </button>
  ));

  return { DOM: vdom$, clicks$ };
}
