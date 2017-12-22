import xs from 'xstream';
import { aside } from '@cycle/dom';
import { componentFactory } from '../../redstone/helpers/cycle-components';
import getMarkup from './markup';
import AppConsole from '../app-console';
import ConfigureRequestForm from '../../iron/configure-request-form';
import TopNavMenu from '../../iron/top-nav-menu';

import styles from './styles.scss';

// empty for now, should import app config from somewhere
const initialReducer$ = xs.of(() => ({
  topNavMenu: {
    classNames: 'topNavMenu',
    menuItems: [
      {
        compId: 'allRequestsButton',
        classNames: 'allRequestsButton navButton',
        text: 'collections',
      },
      {
        compId: 'newRequestButton',
        classNames: 'newRequestButton navButton',
        text: 'new request',
      },
      {
        compId: 'newCollectionButton',
        classNames: 'newCollectionButton navButton',
        text: 'new collection',
      },
    ],
  },
}));

export default function(sources) {
  const { state$ } = sources.onion;
  const scroll$ = sources.SCROLL;

  const appConsoleSinks = componentFactory(AppConsole, sources)('appConsole');
  const mainContentSinks = componentFactory(ConfigureRequestForm, sources)(
    'configureRequestForm',
  );
  const topNavMenuSinks = componentFactory(TopNavMenu, sources)('topNavMenu');

  const asideContentSinks = {
    DOM: xs.of(aside('.asideContent', 'Aside content (not implemented)')),
  };

  const reducers$ = xs.merge(
    initialReducer$,
    appConsoleSinks.onion,
    mainContentSinks.onion,
    topNavMenuSinks.onion,
  );

  const vdom$ = xs
    .combine(
      state$,
      mainContentSinks.DOM,
      asideContentSinks.DOM,
      appConsoleSinks.DOM,
      topNavMenuSinks.DOM,
    )
    .map(getMarkup);

  return {
    DOM: vdom$,
    // SCROLL: scrollSinks$,
    // Log: logSinks$,
    // HTTP: requestSinks$,
    onion: reducers$,
  };
}
