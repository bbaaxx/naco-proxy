// @flow
import xs, { Stream } from 'xstream';
import { componentFactory } from '../../redstone/helpers/cycle-components';
import styles from './styles.scss';

import getMarkup from './markup';
import CyButton from '../../wood/cy-button';

const defaultValues = {
  newReqButton: '',
  newCollectionButton: '',
};
const defaultReducer$ = xs.of(
  prev =>
    typeof prev === 'undefined' ? defaultValues : { ...defaultValues, ...prev },
);
const methodSwitchReducer = mode => prev => ({ ...prev, mode });

export default function(sources: {
  props$: Stream,
  DOM: Stream,
  onion: Stream,
}) {
  const { props$ } = sources;

  const makeButton = componentFactory(CyButton, sources);
  const allRequestsButton = makeButton('allRequests', {
    classNames: 'allRequests navButton',
    text: 'all requests',
  });
  const newRequestButton = makeButton('newReqButton', {
    classNames: 'newReqButton navButton',
    text: 'new request',
  });
  const newCollectionButton = makeButton('newCollectionButton', {
    classNames: 'newCollectionButton navButton',
    text: 'new collection',
  });

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
