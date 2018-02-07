// @flow
import xs, { Stream } from 'xstream';
import { div, p } from '@cycle/dom';

import { componentFactory } from '../../redstone/helpers/cycle-components';
import CyCodeField from '../../wood/cy-code-field';

const initialReducer$ = xs.of(() => ({
  timer: 0,
  scrollPosition: 0,
}));

const timerReducer$ = xs
  .periodic(1000)
  .mapTo(prev => ({ ...prev, timer: prev.timer + 1 }));

const scrollReducer = scrollPosition => prev => ({
  ...prev,
  scrollPosition,
});

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  SCROLL: Stream,
  onion: Stream,
}) {
  const { state$ } = sources.onion;
  const scroll$ = sources.SCROLL;

  const stateObj = {
    get: state => state,
    set: (state, childState) => ({ ...state, view: { ...childState } }),
  };

  const cyCodeFieldSinks = componentFactory(CyCodeField, sources)({
    onion: stateObj,
  });

  const reducers$ = xs.merge(
    initialReducer$,
    timerReducer$,
    cyCodeFieldSinks.onion,
    scroll$.map(scrollReducer),
  );

  const vdom$ = xs
    .combine(state$, cyCodeFieldSinks.DOM)
    .map(([{ timer, scrollPosition }, codeField]) =>
      div('.console-wrap', [
        p(`Been here for: ~ ${timer} seconds`),
        p(`Scroll position is: ${scrollPosition}`),
        { codeField },
      ]),
    );

  return {
    DOM: vdom$,
    // Log: log$,
    // HTTP: request$,
    onion: reducers$,
  };
}
