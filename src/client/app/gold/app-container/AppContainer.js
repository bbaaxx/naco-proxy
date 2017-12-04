// @flow-
import xs from 'xstream';
import { div, p } from '@cycle/dom';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import MasterLayout from '../master-layout';
import SlidesPanel from '../../iron/slides-panel';

const INITIAL_STATE = {
  count: 0,
  scrollPos: 0,
};

function intent(sources) {
  return {
    actions: {
      state$: sources.onion.state$,
      scrollUpdates$: sources.Scroll,
    },
  };
}

function model({ actions, components }) {
  const { state$, scrollUpdates$ } = actions;
  const initialReducer$ = xs.of(() => INITIAL_STATE);
  const scrollReducer$ = scrollUpdates$.map(sp => prev => ({
    ...prev,
    scrollPos: sp,
  }));
  const addOneReducer$ = xs
    .periodic(1000)
    .mapTo(prev => ({ ...prev, count: prev.count + 1 }));
  const reducers$ = xs.merge(initialReducer$, addOneReducer$, scrollReducer$);

  return {
    state$,
    reducers$,
    // request$: upstream--->.HTTP,
    // log$: upstream--->.Log,
    // scroll$: upstream--->.Scroll,
  };
}

function view(state$) {
  return state$.map(({ count, scrollPos }) =>
    div('.app-container', [
      div('.app-wrap', [p(`The times are ${'nigh'}`)]),
      div('.console-wrap', [
        p(`Count is: ${count}`),
        p(`Scroll is at: ${scrollPos}`),
      ]),
    ]),
  );
}

export default function(sources) {
  const { state$, reducers$ } = model(intent(sources));
  return {
    DOM: view(state$),
    // Scroll: state.scroll$,
    // Log: state.log$,
    // HTTP: state.request$,
    onion: reducers$,
  };
}
