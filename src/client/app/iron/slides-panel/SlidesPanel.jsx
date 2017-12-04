/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import { slideMakerMaker, panelMakerMaker } from './makers';

function intent(sources) {
  const { state$ } = sources.onion;
  return {
    actions: {
      newRequest$: state$.map(o => o.requestConfig),
    },
    components: {
      slidePanel$: sources.HTTP.select('slides')
        .flatten()
        .map(resp => resp.body.slides)
        .map(slideMakerMaker(sources))
        .map(panelMakerMaker(sources)),
    },
  };
}

function model({ actions, components }) {
  return {
    requests$: actions.newRequest$,
    slidePanelVdom$: components.slidePanel$
      .map(slp => slp.map(sl => sl.DOM))
      .map(slp => xs.combine(...slp))
      .flatten(),
  };
}

function view({ slidePanelVdom$ }) {
  return slidePanelVdom$.map(slidePanelVdom => (
    <div className="slidePanel">{slidePanelVdom}</div>
  ));
}

export default function(sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    HTTP: state.requests$,
    // Scroll: xs.merge(state.scrollDownClick$, state.log$),
    // Log: state.log$,
  };
}
