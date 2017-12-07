/** @jsx html */
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
export default function(sources) {
  const props$ = sources.props;
  const { state$ } = sources.ONION;
  const defaultReducer$ = xs.of(function defaultReducer$(prev) {
    return typeof prev === 'undefined' ? { inputValue: null } : prev;
  });
  const reducer$ = sources.DOM.select('.cy-input')
    .events('input')
    .map(
      e =>
        function inputReducer(prev) {
          return { ...prev, inputValue: e.target.value };
        },
    );

  const vdom$ = state$.debug(w => console.log('w', w)).map(state => (
    <div>
      <input
        className={`cy-input ${state.className}`}
        placeholder={state.placeholder}
      />
      <p>yo {state}</p>
    </div>
  ));

  return { DOM: vdom$, ONION: reducer$ };
}
