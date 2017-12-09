import xs from 'xstream';
import { div, p } from '@cycle/dom';

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

export default function(sources) {
  const { state$ } = sources.ONION;
  const scroll$ = sources.SCROLL;

  const reducers$ = xs.merge(
    initialReducer$,
    timerReducer$,
    scroll$.map(scrollReducer),
  );

  const vdom$ = state$.map(({ timer, scrollPosition }) =>
    div('.console-wrap', [
      p(`Been here for: ~ ${timer} seconds`),
      p(`Scroll position is: ${scrollPosition}`),
    ]),
  );

  return {
    DOM: vdom$,
    // Log: log$,
    // HTTP: request$,
    ONION: reducers$,
  };
}
