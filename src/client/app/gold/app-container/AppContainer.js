import xs from 'xstream';
import { div, p } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';

import MasterLayout from '../master-layout';
import AppConsole from '../app-console';

const initialReducer$ = xs.of(() => ({
  appConsole: {
    timer: 0,
    scrollPosition: 0,
  },
}));

const getMasterLayout = sources =>
  isolateExplicit(MasterLayout, 'masterLayout', sources, {
    className: 'masterLayout',
    content: {
      mainContent: 'The main content',
      asideContent: 'The aside content',
    },
  });
const getAppConsole = sources =>
  isolateExplicit(AppConsole, 'appConsole', sources);

export default function(sources) {
  const { state$ } = sources.ONION;
  const scroll$ = sources.SCROLL;

  const appConsoleSinks = getAppConsole(sources);
  const appConsoleVdom$ = appConsoleSinks.DOM;
  const appConsoleReducer$ = appConsoleSinks.ONION;

  const masterLayoutVdom$ = getMasterLayout(sources).DOM;

  const reducers$ = xs.merge(initialReducer$, appConsoleReducer$);

  const vdom$ = xs
    .combine(state$, masterLayoutVdom$, appConsoleVdom$)
    .map(([{ timer, scrollPosition }, masterLayoutVdom, appConsoleVdom]) =>
      div('.app-container', [masterLayoutVdom, appConsoleVdom]),
    );

  return {
    DOM: vdom$,
    // SCROLL: scrollSinks$,
    // Log: logSinks$,
    // HTTP: requestSinks$,
    ONION: reducers$,
  };
}
