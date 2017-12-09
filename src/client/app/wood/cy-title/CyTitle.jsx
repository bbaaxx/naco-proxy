/** @jsx html */
import Snabbdom from 'snabbdom-pragma';

export default function(sources) {
  return {
    DOM: sources.props$.map(props => (
      <h1 className="rsm-title">{props.title}</h1>
    )),
  };
}
