/** @jsx html */
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeGunDriver } from 'cycle-gun';
import onionify from 'cycle-onionify';
import makeScrollDriver from './redstone/drivers';
import AppContainer from './gold/app-container';

import registerCustomElements from './registerCustomElements';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

window.addEventListener('WebComponentsReady', registerCustomElements);

export default function App(selector) {
  const scrollTarget = document.getElementsByTagName('html')[0];
  const makeDrivers = () => ({
    DOM: makeDOMDriver(selector),
    HTTP: makeHTTPDriver(),
    SCROLL: makeScrollDriver({ duration: 400, element: scrollTarget }),
    GUN: makeGunDriver({ root: 'root', peers: ['http://localhost:3838'] }),
    LOG: msg$ => {
      msg$.addListener({ next: msg => console.info(msg) });
    },
  });

  return () => {
    run(onionify(AppContainer, 'ONION'), makeDrivers());
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
