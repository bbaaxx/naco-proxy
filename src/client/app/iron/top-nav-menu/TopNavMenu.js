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
  ONION: Stream,
}) {
  const { props$ } = sources;

  const makeButton = componentFactory(CyButton, sources);
  const newRequestButton = makeButton('newReqButton', {
    classNames: 'newReqButton',
    text: 'new request',
  });
  const newCollectionButton = makeButton('newCollectionButton', {
    classNames: 'newCollectionButton',
    text: 'new collection',
  });

  const reducers$ = xs.merge(defaultReducer$);

  const vdom$ = xs
    .combine(props$, newRequestButton.DOM, newCollectionButton.DOM)
    .map(getMarkup);

  return { DOM: vdom$, ONION: reducers$ };
}
