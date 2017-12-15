// @flow
import * as Snabbdom from 'snabbdom-pragma';
import { DOMSource, VNode } from '@cycle/dom';
import xs, { Stream } from 'xstream';
import './styles.scss';

const defaultValues = {
  type: 'button',
  text: 'button',
  classNames: '',
};

const defaultReducer$ = xs.of(
  prev =>
    typeof prev === 'undefined' ? defaultValues : { ...defaultValues, ...prev },
);

export default function(sources: {
  DOM: DOMSource,
  onion: Stream<{
    type?: string,
    text: string,
    classNames: string,
  }>,
}) {
  const { state$ } = sources.onion;

  const clicks$ = sources.DOM.select('button').events('click');

  const reducers$ = xs.merge(defaultReducer$);

  const vdom$ = state$.map(state => (
    <button className={`cy-button ${state.classNames}`} type={state.type}>
      {state.text}
    </button>
  ));

  return { DOM: vdom$, clicks$, onion: reducers$ };
}
