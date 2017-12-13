import * as Snabbdom from 'snabbdom-pragma';
import { DOMSource, VNode } from '@cycle/dom';
import { Stream } from 'xstream';
import './styles.scss';

interface Sources {
  DOM: DOMSource;
  props$?: Stream<{ classNames: String; type: String; text: String }>;
}

interface Sinks {
  DOM: Stream<VNode>;
  clicks$: Stream<MouseEvent>;
}

/** convert a style object to a CSS class name */

export default function(sources: Sources): Sinks {
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
