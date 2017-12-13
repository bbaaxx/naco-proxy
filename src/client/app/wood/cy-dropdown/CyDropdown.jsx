// @flow
import xs, { Stream } from 'xstream';
import Snabbdom from 'snabbdom-pragma';
import './styles.scss';

const defaultValues = { value: '' };
const defaultReducer = prev =>
  typeof prev === 'undefined' ? defaultValues : prev;
const selectReducer = e => prev => ({ ...prev, value: e.target.value });

const getOptsElement = opt => <option value={opt.value}>{opt.text}</option>;

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  ONION: Stream,
}) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;

  const selectReducer$ = sources.DOM.select('.cyDropdown')
    .events('input')
    .map(selectReducer);

  const reducers$ = xs.merge(xs.of(defaultReducer), selectReducer$);

  const vdom$ = xs.combine(state$, props$).map(([state, props]) => (
    <select className={`cyDropdown ${props.className || ''}`}>
      {props.unselectedDefault && (
        <option value="" disabled selected>
          {props.unselectedDefault}
        </option>
      )}
      {props.options.map(getOptsElement)}
    </select>
  ));

  return { DOM: vdom$, ONION: reducers$ };
}
