// @flow-
import xs from 'xstream';
import { div, p } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';

import MasterLayout from '../master-layout';
import CyInput from '../../wood/cy-input';

const INITIAL_STATE = {
  count: 0,
  scrollPos: 0,
  masterLayout: 0,
  urlInput: {
    placeholder: 'Please provide a URL',
    className: 'urlInput',
    inputValue: null,
  },
};

function intent(sources) {
  const urlInput = isolateExplicit(CyInput, 'urlInput', sources);
  const masterLayout = isolateExplicit(MasterLayout, 'masterLayout', sources, {
    content: urlInput.DOM,
  });
  return {
    actions: {
      state$: sources.ONION.state$,
      scroll$: sources.SCROLL,
    },
    components: { masterLayout, urlInput },
  };
}

function model({ actions, components }) {
  const { state$, scroll$ } = actions;
  const { masterLayout, urlInput } = components;
  const initialReducer$ = xs.of(() => INITIAL_STATE);
  const scrollReducer$ = scroll$.map(scrollPos => prev => ({
    ...prev,
    scrollPos,
  }));

  const addOneReducer$ = xs
    .periodic(1000)
    .mapTo(prev => ({ ...prev, count: prev.count + 1 }));
  const reducers$ = xs.merge(initialReducer$, addOneReducer$, scrollReducer$);
  return {
    state$,
    reducers$,
    components,
    request$: masterLayout.HTTP,
    log$: xs.merge(masterLayout.LOG, urlInput.LOG),
    scroll$: masterLayout.SCROLL,
  };
}

function view(state$, components) {
  const { masterLayout } = components;
  const mlVdom$ = masterLayout.DOM;
  return xs
    .combine(state$, mlVdom$)
    .map(([{ count, scrollPos }, mlVdom]) =>
      div('.app-container', [
        div('.app-wrap', [mlVdom]),
        div('.console-wrap', [
          p(`Count is: ${count}`),
          p(`SCROLL is at: ${scrollPos}`),
        ]),
      ]),
    );
}

export default function(sources) {
  const { state$, scroll$, reducers$, log$, components } = model(
    intent(sources),
  );
  return {
    DOM: view(state$, components),
    SCROLL: scroll$,
    Log: log$,
    // HTTP: request$,
    ONION: reducers$,
  };
}
