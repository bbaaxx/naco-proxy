// @flow-
import xs from 'xstream';
import { div } from '@cycle/dom';
import getMarkup from './markup';

export default function(sources) {
  const vdom$ = xs.of(div('.mainContent', ['The main content']));
  return {
    DOM: vdom$,
    // SCROLL: state.scrollDownClick$,
    // LOG: state.log$,
    // HTTP: state.upstreamRequests$,
  };
}
