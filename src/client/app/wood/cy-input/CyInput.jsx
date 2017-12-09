/** @jsx html */
import xs from 'xstream';
import Snabbdom from 'snabbdom-pragma';

const defaultValues = { className: '', placeholder: '', inputValue: '' };
const defaultReducer = prev =>
  typeof prev === 'undefined' ? defaultValues : { ...defaultValues, ...prev };
const inputReducer = e => prev => ({ ...prev, inputValue: e.target.value });

export default function(sources) {
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
        className={`cyInput ${state.className || props.className}`}
        placeholder={state.placeholder || props.placeholder}
      />
    ));

  return { DOM: vdom$, ONION: reducers$ };
}
