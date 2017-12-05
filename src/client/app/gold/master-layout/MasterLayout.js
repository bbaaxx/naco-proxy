// @flow-
import xs from 'xstream';
import { isolateExplicit } from '../../redstone/helpers/cycle-components';
import { div } from '@cycle/dom';
import RsmButton from '../../wood/rsm-button';
import getMarkup from './markup';

function getScrollButton(sources, cid = 'scrollButton') {
  return isolateExplicit(RsmButton, cid, sources, {
    text: '+200',
    className: 'scroll-down-button',
  });
}

function intent(sources) {
  const scrollButton = getScrollButton(sources, 'scrollButton');
  return {
    actions: {
      scrollPosition$: sources.ONION.state$.map(state => state.scrollPos),
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
    scrollDownClick$: newClick$
      .map(() => scrollPosition$.take(1))
      .flatten()
      .map(e => e + 200),
    log$: actions.newError$,
  };
}

function view({ scrollPosition$, scrollButtonVdom$ }) {
  return xs
    .combine(scrollPosition$, scrollButtonVdom$)
    .map(vals => {
      let markup;
      try {
        markup = getMarkup(vals);
      } catch (e) {
        console.log(e);
        markup = div('yolocon');
      } finally {
        console.log('markup', markup);
        return markup;
      }
    })
    .startWith(div('Loading ...'));
}

export default function(sources) {
  const state = model(intent(sources));
  return {
    DOM: view(state),
    SCROLL: state.scrollDownClick$,
    LOG: state.log$,
    // HTTP: state.upstreamRequests$,
  };
}
