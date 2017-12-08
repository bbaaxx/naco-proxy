/** @jsx html */
// @flow
import { html } from 'snabbdom-jsx';

export default function BasicSlide(sources) {
  const { props$ } = sources;
  const vdom$ = props$.map(props => (
    <div className="basicSlide">{props.contents}</div>
  ));

  return {
    DOM: vdom$,
  };
}
