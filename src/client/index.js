import { runApp } from './app';
import { getRootElement, clearRootElement } from './app/redstone/helpers/dom';

// Run the app
runApp(getRootElement());

// Enable HMR
if (module && module.hot) {
  module.hot.accept();
}
