import xs from 'xstream';
import { div, section } from '@cycle/dom';
import {
  isolateExplicit,
  componentFactory,
} from '../../redstone/helpers/cycle-components';
import getMarkup from './markup';
import AppConsole from '../app-console';
import ConfigureRequestForm from '../../iron/configure-request-form';
import TopNavMenu from '../../iron/top-nav-menu';

import styles from './styles.scss';

// empty for now, should import app config from somewhere
const initialReducer$ = xs.of(() => ({}));

const getMainContent = sources =>
  isolateExplicit(ConfigureRequestForm, 'configureRequestForm', sources);
const getAppConsole = sources =>
  isolateExplicit(AppConsole, 'appConsole', sources);
const getTopNavMenu = sources =>
  isolateExplicit(TopNavMenu, 'topNavMenu', sources, { classNames: 'yol' });

export default function(sources) {
  const { state$ } = sources.ONION;
  const scroll$ = sources.SCROLL;

  const appConsoleSinks = getAppConsole(sources);
  const mainContentSinks = getMainContent(sources);
  const topNavMenu = componentFactory(TopNavMenu, sources)('topNavMenu', {
    classNames: 'yol',
  });

  const asideContentSinks = {
    DOM: xs.of(section('.asideContent', 'Aside content (not implemented)')),
  };

  const reducers$ = xs.merge(
    initialReducer$,
    appConsoleSinks.ONION,
    mainContentSinks.ONION,
  );

  const vdom$ = xs
    .combine(
      state$,
      mainContentSinks.DOM,
      asideContentSinks.DOM,
      appConsoleSinks.DOM,
      topNavMenu.DOM,
    )
    .map(getMarkup);

  return {
    DOM: vdom$,
    // SCROLL: scrollSinks$,
    // Log: logSinks$,
    // HTTP: requestSinks$,
    ONION: reducers$,
  };
}
