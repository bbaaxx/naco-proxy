/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

export default function(sources) {
  return {
    DOM: sources.props.map(props => (
      <h1 className="rsm-title">{props.title}</h1>
    )),
  };
}
