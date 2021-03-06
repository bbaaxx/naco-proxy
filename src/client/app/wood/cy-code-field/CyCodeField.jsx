// @flow
import xs, { Stream } from 'xstream';
import { textarea } from '@cycle/dom';
import Snabbdom from 'snabbdom-pragma';
import CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import styles from './styles.scss';

const defaultReducer = prev =>
  typeof prev === 'undefined' ? { value: '' } : prev;
const inputReducer = e => prev => ({ ...prev, value: e.detail.getValue() });

export default function(sources: { DOM: Stream, onion: Stream }) {
  const { state$ } = sources.onion;

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

  const vdom$ = state$.map(state => (
    <div>
      {textarea('.cyCodeField', { hook: { insert: codeMirrorHook } }, [
        state.value || '',
      ])}
    </div>
  ));

  return { DOM: vdom$, onion: reducers$ };
}
