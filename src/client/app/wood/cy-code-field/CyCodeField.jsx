// @flow
import xs, { Stream } from 'xstream';
import { textarea } from '@cycle/dom';
import Snabbdom from 'snabbdom-pragma';
import CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import styles from './styles.scss';

const defaultValues = { value: void 0 };
const defaultReducer = prev =>
  typeof prev === 'undefined' ? defaultValues : prev;
const inputReducer = e => prev => ({ ...prev, value: e.detail.getValue() });

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  ONION: Stream,
}) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;

  const inputReducer$ = sources.DOM.select('.cyCodeField')
    .events('cy-code-field-change')
    .map(inputReducer);

  const reducers$ = xs.merge(xs.of(defaultReducer), inputReducer$);

  const codeMirrorHook = vnode =>
    CodeMirror.fromTextArea(vnode.elm, {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'javascript',
      theme: 'solarized',
    }).on('change', chg =>
      vnode.elm.dispatchEvent(
        new CustomEvent('cy-code-field-change', {
          detail: chg,
          bubbles: true,
        }),
      ),
    );

  const vdom$ = xs.combine(state$, props$).map(([state, props]) => (
    <div>
      {textarea(
        '.cyCodeField',
        {
          attrs: { placeholder: props.placeholder },
          hook: { insert: codeMirrorHook },
        },
        [state.value || props.initialValue || ''],
      )}
    </div>
  ));

  return { DOM: vdom$, ONION: reducers$ };
}
