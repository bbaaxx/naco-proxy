// @flow
import xs, { Stream } from 'xstream';
import { componentFactory } from '../../redstone/helpers/cycle-components';
import styles from './styles.scss';

import getMarkup from './markup';
import CyButton from '../../wood/cy-button';

const defaultValues = {
  allRequestsButton: {
    classNames: 'allRequestsButton navButton',
    text: 'all requests',
  },
  newRequestButton: {
    classNames: 'newRequestButton navButton',
    text: 'new request',
  },
  newCollectionButton: {
    classNames: 'newCollectionButton navButton',
    text: 'new collection',
  },
};
const defaultReducer$ = xs.of(
  prev =>
    typeof prev === 'undefined' ? defaultValues : { ...defaultValues, ...prev },
);

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  onion: Stream,
}) {
  const { props$ } = sources;

  const makeButton = componentFactory(CyButton, sources);

  const allRequestsButton = makeButton('allRequestsButton');
  const newRequestButton = makeButton('newRequestButton');
  const newCollectionButton = makeButton('newCollectionButton');

  const reducers$ = xs.merge(defaultReducer$);

  const vdom$ = xs
    .combine(
      props$,
      allRequestsButton.DOM,
      newRequestButton.DOM,
      newCollectionButton.DOM,
    )
    .map(getMarkup);

  return { DOM: vdom$, onion: reducers$ };
}
