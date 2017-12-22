// @flow
import xs, { Stream } from 'xstream';
import { li } from '@cycle/dom';
import {
  componentFactory,
  isolateExplicit,
} from '../../redstone/helpers/cycle-components';
import styles from './styles.scss';

import getMarkup from './markup';
import CyButton from '../../wood/cy-button';

import { makeCollection } from 'cycle-onionify';

const defaultValues = {
  menuItems: [
    {
      compId: 'allRequestsButton',
      classNames: 'allRequestsButton navButton',
      text: 'all requests',
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
};

const defaultReducer$ = xs.of(
  prev => (typeof prev === 'undefined' ? defaultValues : prev),
);

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  onion: Stream,
}) {
  const { props$ } = sources;

  const makeButton = componentFactory(CyButton, sources);

  const Menu = makeCollection({
    item: CyButton,
    itemKey: childSt => childSt.compId, // or, e.g., childState.key
    itemScope: key => key,
    collectSinks: instances => {
      return {
        onion: instances.pickMerge('onion'),
        DOM: instances.pickCombine('DOM'),
      };
    },
  });

  const menuSinks = isolateExplicit(Menu, 'menuItems', sources);

  // menuSinks.DOM.addListener({ next: stf => console.log('stf', stf) });

  const reducers$ = xs.merge(defaultReducer$);

  const vdom$ = xs.combine(props$, menuSinks.DOM).map(getMarkup);

  return { DOM: vdom$, onion: reducers$ };
}
