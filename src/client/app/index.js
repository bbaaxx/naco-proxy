/** @jsx html */
import { run } from '@cycle/run';
import onionify from 'cycle-onionify';
import { makeGunDriver } from 'cycle-gun';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

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
    // GUN: makeGunDriver({ root: 'root', peers: ['http://localhost:3838'] }),
    LOG: msg$ => {
      msg$.addListener({ next: msg => console.info(msg) });
    },
  });

  return () => {
    run(onionify(AppContainer, 'onion'), makeDrivers());
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
