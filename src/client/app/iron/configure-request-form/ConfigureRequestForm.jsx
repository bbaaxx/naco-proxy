import xs from 'xstream';
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

export default function(sources) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;

  const modeSwitchReducer$ = sources.DOM.select('.configureRequestForm')
    .events('click')
    .mapTo(modeSwitchReducer('yolo'));

  const reducers$ = xs.merge(xs.of(defaultReducer), modeSwitchReducer$);

  const vdom$ = xs
    .combine(props$, state$)
    .map(([props, state]) => (
      <div className={`configureRequestForm ${props.className || ''}`}>
        Configure Request Form in mode {state.mode}
      </div>
    ));

  return { DOM: vdom$, ONION: reducers$ };
}
