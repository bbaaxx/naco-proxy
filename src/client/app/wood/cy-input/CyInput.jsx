// @flow
import xs, { Stream } from 'xstream';
import Snabbdom from 'snabbdom-pragma';
import './styles.scss';

const defaultValues = { value: '' };
const defaultReducer = prev =>
  typeof prev === 'undefined' ? defaultValues : prev;
const inputReducer = e => prev => ({ ...prev, value: e.target.value });

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  ONION: Stream,
}) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;

  const inputReducer$ = sources.DOM.select('.cyInput')
    .events('input')
    .map(inputReducer);

  const reducers$ = xs.merge(xs.of(defaultReducer), inputReducer$);

  const vdom$ = xs
    .combine(state$, props$)
    .map(([state, props]) => (
      <input
        className={`cyInput ${props.classNames || ''}`}
        placeholder={props.placeholder || ''}
      />
    ));

  return { DOM: vdom$, ONION: reducers$ };
}
