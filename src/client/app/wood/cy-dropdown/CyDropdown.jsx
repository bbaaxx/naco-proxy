/** @jsx html */
import xs from 'xstream';
import { html } from 'snabbdom-jsx';

const defaultValues = { className: '', selectedValue: '' };
const defaultReducer = prev =>
  typeof prev === 'undefined' ? defaultValues : { ...defaultValues, ...prev };
const inputReducer = e => prev => ({ ...prev, selectedValue: e.target.value });

export default function(sources) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;

  const inputReducer$ = sources.DOM.select('.cyDropdown')
    .events('input')
    .map(inputReducer);

  const reducers$ = xs.merge(xs.of(defaultReducer), inputReducer$);

  const vdom$ = xs
    .combine(state$, props$)
    .map(([state, props]) => (
      <select className={`cyDropdown ${props.className}`}>{'moloyan'}</select>
    ));

  return { DOM: vdom$, ONION: reducers$ };
}
