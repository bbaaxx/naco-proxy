/** @jsx Snabbdom.createElement */
// @flow
import xs, { Stream } from 'xstream';
import Snabbdom from 'snabbdom-pragma';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';

import CyInput from '../../wood/cy-input';

const defaultValues = {
  mode: 'get-request',
};
const defaultReducer = prev =>
  typeof prev === 'undefined'
    ? { ...defaultValues }
    : { ...defaultValues, ...prev };
const modeSwitchReducer = mode => prev => ({ ...prev, mode });

const cyInputMaker = sources => (uId, props) =>
  isolateExplicit(CyInput, uId, sources, props);

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  ONION: Stream,
}) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;
  const makeInput = cyInputMaker(sources);

  const urlInputSinks = makeInput('urlInput', {
    classNames: 'urlInput',
    placeholder: 'Please provide a URL',
  });

  const modeSwitchReducer$ = sources.DOM.select('.configureRequestForm')
    .events('click')
    .mapTo(modeSwitchReducer('yolo'));

  const reducers$ = xs.merge(
    xs.of(defaultReducer),
    modeSwitchReducer$,
    urlInputSinks.ONION,
  );

  const vdom$ = xs
    .combine(props$, state$, urlInputSinks.DOM)
    .map(([props, state, urlInput]) => (
      <div className={`configureRequestForm ${props.className || ''}`}>
        {urlInput}
      </div>
    ));

  return { DOM: vdom$, ONION: reducers$ };
}
