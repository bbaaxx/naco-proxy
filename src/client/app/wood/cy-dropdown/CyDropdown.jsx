// @flow
import xs, { Stream } from 'xstream';
import Snabbdom from 'snabbdom-pragma';
import './styles.scss';

const defaultValues = {
  value: '',
  classNames: '',
  unselectedDefault: void 0,
  options: [],
};
const defaultReducer$ = xs.of(
  prev => (typeof prev === 'undefined' ? defaultValues : prev),
);
const selectReducer = e => prev => ({ ...prev, value: e.target.value });

const getOptsElement = opt => <option value={opt.value}>{opt.text}</option>;

export default function(sources: { DOM: Stream, onion: Stream }) {
  const { state$ } = sources.onion;

  const selectReducer$ = sources.DOM.select('.cyDropdown')
    .events('input')
    .map(selectReducer);

  const reducers$ = xs.merge(defaultReducer$, selectReducer$);

  const vdom$ = state$.map(state => (
    <select className={`cyDropdown ${state.className || ''}`}>
      {state.unselectedDefault && (
        <option value="" disabled selected>
          {typeof state.unselectedDefault !== 'undefined' &&
            state.unselectedDefault}
        </option>
      )}
      {state.options.map(getOptsElement)}
    </select>
  ));

  return { DOM: vdom$, onion: reducers$ };
}
