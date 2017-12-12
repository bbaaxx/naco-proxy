// @flow
import xs, { Stream } from 'xstream';
import { textarea } from '@cycle/dom';
import Snabbdom from 'snabbdom-pragma';
import CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import styles from './styles.scss';

// console.log('styles', styles);

const defaultValues = { value: 'console.log();' };
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

  const inputReducer$ = sources.DOM.select('.cyCodeField')
    .events('input')
    .map(inputReducer);

  const reducers$ = xs.merge(xs.of(defaultReducer), inputReducer$);

  const vdom$ = xs.combine(state$, props$).map(([state, props]) => (
    <div>
      <wc-code-field />
      {textarea(
        '.cyCodeField.CodeMirror',
        {
          attrs: { placeholder: props.placeholder },
          hook: {
            insert: vnode =>
              CodeMirror.fromTextArea(vnode.elm, {
                lineNumbers: true,
                lineWrapping: true,
                mode: 'javascript',
              }),
          },
        },
        [state.value],
      )}
    </div>
  ));

  return { DOM: vdom$, ONION: reducers$ };
}
