// @flow
import xs, { Stream } from 'xstream';
import { makeCollection } from 'cycle-onionify';
import {
  componentFactory,
  isolateExplicit,
} from '../../redstone/helpers/cycle-components';
import getMarkup from './markup';
import CyButton from '../../wood/cy-button';

import styles from './styles.scss';

const defaultValues = { menuItems: [] };
const defaultReducer$ = xs.of(
  prev => (typeof prev === 'undefined' ? defaultValues : prev),
);

export default function(sources: { DOM: Stream, onion: Stream }) {
  const { state$ } = sources.onion;
  const makeButton = componentFactory(CyButton, sources);
  const Menu = makeCollection({
    item: CyButton,
    itemKey: childSt => childSt.compId,
    itemScope: key => key,
    collectSinks: instances => ({
      onion: instances.pickMerge('onion'),
      DOM: instances.pickCombine('DOM'),
    }),
  });
  const menuSinks = isolateExplicit(Menu, 'menuItems', sources);

  return {
    DOM: xs.combine(state$, menuSinks.DOM).map(getMarkup),
    onion: xs.merge(defaultReducer$),
  };
}
