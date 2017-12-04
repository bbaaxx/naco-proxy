// @flow-
import xs from 'xstream';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import RsmButton from '../../wood/rsm-button';
import getMarkup from './markup';

function getScrollButton(sources, cid = 'scrollButton') {
  return isolateExplicit(RsmButton, cid, sources, {
    text: '+200',
    className: 'scroll-down-button',
  });
}

function intent(sources) {
  const scrollButton = getScrollButton(sources, 'scrollButton1');
  return {
    actions: {
      scrollPosition$: sources.onion.state$.map(val => val.scrollPosition),
      newClick$: scrollButton.clicks$,
      newError$: sources.DOM.events('error'),
    },
    components: {
      scrollButton,
      mainContent: sources.props.map(props => props.content),
    },
  };
}

function model({ actions, components }) {
  const { newClick$, scrollPosition$ } = actions;
  const scrollButtonVdom$ = components.scrollButton.DOM;
  return {
    scrollButtonVdom$,
    scrollPosition$,
    mainContentVdom$: components.mainContent
      .map(mainContent => mainContent.DOM)
      .flatten(),
    upstreamRequests$: components.mainContent
      .map(mainContent => mainContent.HTTP)
      .flatten(),
    scrollDownClick$: newClick$
      .map(() => scrollPosition$.take(1))
      .flatten()
      .map(e => e + 200),
    log$: actions.newError$,
  };
}

function view({ scrollPosition$, scrollButtonVdom$, mainContentVdom$ }) {
  return xs
    .combine(scrollPosition$, scrollButtonVdom$, mainContentVdom$)
    .map(getMarkup);
}

export default function(sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    Scroll: state.scrollDownClick$,
    Log: state.log$,
    HTTP: state.upstreamRequests$,
  };
}
