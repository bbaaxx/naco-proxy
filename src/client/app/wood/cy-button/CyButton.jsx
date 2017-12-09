/** @jsx html */
import Snabbdom from 'snabbdom-pragma';

export default function(sources) {
  const clicks$ = sources.DOM.select('button').events('click');

  const { props$ } = sources;

  const vdom$ = props$.map(props => (
    <button className={`cy-button ${props.className}`} value={props.parentData}>
      {props.text}
    </button>
  ));

  return { DOM: vdom$, clicks$ };
}
