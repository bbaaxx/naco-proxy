/** @jsx html */
import xs from 'xstream';
import Snabbdom from 'snabbdom-pragma';

const defaultValues = { className: '', placeholder: '', inputValue: '' };
const defaultReducer = prev =>
  typeof prev === 'undefined' ? defaultValues : { ...defaultValues, ...prev };
const selectReducer = e => prev => ({ ...prev, inputValue: e.target.value });

const getOptsElement = opt => <option value={opt.value}>{opt.text}</option>;

const optsMock = [
  { text: 'option one', value: 'one' },
  { text: 'option two', value: 'two' },
];

export default function(sources) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;

  const selectReducer$ = sources.DOM.select('.cyInput')
    .events('input')
    .map(selectReducer);

  const reducers$ = xs.merge(xs.of(defaultReducer), selectReducer$);

  const vdom$ = xs
    .combine(state$, props$)
    .map(([state, props]) => (
      <select className={`cyInput ${state.className || props.className}`}>
        {optsMock.map(getOptsElement)}
      </select>
    ));

  return { DOM: vdom$, ONION: reducers$ };
}
