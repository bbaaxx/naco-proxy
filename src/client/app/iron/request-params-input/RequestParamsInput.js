// @flow
import xs, { Stream } from 'xstream';
import { componentFactory } from '../../redstone/helpers/cycle-components';
import styles from './styles.scss';

import getMarkup from './markup';
import CyInput from '../../wood/cy-input';
import CyDropdown from '../../wood/cy-dropdown';
import CyButton from '../../wood/cy-button';
import CyCodeField from '../../wood/cy-code-field';

const defaultValues = {
  mode: 'get-request',
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
  const { state$ } = sources.onion;

  const makeInput = componentFactory(CyInput, sources);
  const makeButton = componentFactory(CyButton, sources);

  const keyInputSinks = makeInput('keyInput', {
    classNames: 'keyInput tableInput',
    placeholder: 'Key (id)',
  });
  const valueInputSinks = makeInput('valInput', {
    classNames: 'valInput tableInput',
    placeholder: 'Value',
  });
  const descInputSinks = makeInput('descInput', {
    classNames: 'descInput tableInput',
    placeholder: 'Description',
  });
  const delButtonSinks = makeButton('delButton', {
    classNames: 'delButton',
    text: 'Delete',
  });

  const reducers$ = xs.merge(
    defaultReducer$,
    keyInputSinks.onion,
    valueInputSinks.onion,
    descInputSinks.onion,
  );

  const vdom$ = xs
    .combine(
      props$,
      state$,
      keyInputSinks.DOM,
      valueInputSinks.DOM,
      descInputSinks.DOM,
      delButtonSinks.DOM,
    )
    .map(getMarkup);

  return { DOM: vdom$, onion: reducers$ };
}
