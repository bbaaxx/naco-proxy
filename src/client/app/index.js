/** @jsx html */
import xs from 'xstream';

import { run } from '@cycle/run';
import switchPath from 'switch-path';
import onionify from 'cycle-onionify';
import { makeGunDriver } from 'cycle-gun';
import { routerify } from 'cyclic-router';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeHistoryDriver } from '@cycle/history';

import makeScrollDriver from './redstone/drivers';
import AppContainer from './gold/app-container';

import registerCustomElements from './registerCustomElements';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

window.addEventListener('WebComponentsReady', registerCustomElements);

function main(sources) {
  const match$ = sources.router.define({
    '/': AppContainer,
    '/other': AppContainer,
  });

  const page$ = match$.map(({ path, value }) => {
    return value(
      Object.assign({}, sources, {
        router: sources.router.path(path), // proxies history driver source
      }),
    );
  });
  console.log(Object.keys(sources));
  return {
    DOM: page$.map(c => c.DOM).flatten(),
    onion: page$.map(c => c.onion || xs.of({})).flatten(),
    HTTP: page$.map(c => c.HTTP || xs.of({})).flatten(),
    SCROLL: page$.map(c => c.SCROLL || xs.of(0)).flatten(),
    LOG: page$.map(c => c.LOG || xs.of('Default logger initialized')).flatten(),
    GUN: page$
      .map(
        c => c.GUN || xs.of(gd => gd.get('appstate/init').put({ arewe: true })),
      )
      .flatten(),
    router: xs.of('/'), // proxying history driver on sink and sending to /
  };
}

export default function App(selector) {
  const scrollTarget = document.getElementsByTagName('html')[0];
  const makeDrivers = () => ({
    DOM: makeDOMDriver(selector),
    HTTP: makeHTTPDriver(),
    SCROLL: makeScrollDriver({ duration: 400, element: scrollTarget }),
    GUN: makeGunDriver({ root: 'root' }),
    // GUN: makeGunDriver({ root: 'root', peers: ['http://localhost:3838'] }),
    LOG: msg$ => {
      msg$.addListener({ next: msg => console.info(msg) });
    },
    history: makeHistoryDriver(),
  });

  return () => {
    // run(onionify(main, 'onion'), makeDrivers());
    run(onionify(routerify(main, switchPath), 'onion'), makeDrivers());
    // run(routerify(onionify(main, 'onion'), switchPath), makeDrivers());
  };
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const registration = runtime.register();
      registration.then(dodo => {
        console.log('serviceWorker installed', dodo);
      });
    });
  }
}
export function runApp(rootElement) {
  App(`#${rootElement.id}`)();
  // const appInstance = App(`#${rootElement.id}`)();
  // appInstance();
  // registerServiceWorker();
}
