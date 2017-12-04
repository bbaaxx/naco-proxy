/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

export default function(sources) {
  const clicks$ = sources.DOM.select('button').events('click');

  const props$ = sources.props;

  const vdom$ = props$.map(props => (
    <button
      className={`rsm-button ${props.className}`}
      value={props.parentData}
    >
      {props.text}
    </button>
  ));

  return { DOM: vdom$, clicks$ };
}
