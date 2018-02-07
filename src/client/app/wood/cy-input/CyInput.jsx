// @flow
import xs, { Stream } from 'xstream';
import Snabbdom from 'snabbdom-pragma';
import './styles.scss';

const defaultValues = { value: '' };
const defaultReducer = prev =>
  typeof prev === 'undefined' ? defaultValues : prev;
const inputReducer = e => prev => ({ ...prev, value: e.target.value });

export default function(sources: { DOM: Stream, onion: Stream }) {
  const { state$ } = sources.onion;

  const inputReducer$ = sources.DOM.select('.cyInput')
    .events('input')
    .map(inputReducer);

  const reducers$ = xs.merge(xs.of(defaultReducer), inputReducer$);

  const vdom$ = state$.map(state => (
    <input
      className={`cyInput ${state.classNames || ''}`}
      placeholder={state.placeholder || ''}
    />
  ));

  return { DOM: vdom$, onion: reducers$ };
}
