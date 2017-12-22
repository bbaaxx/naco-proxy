// @flow
import xs, { Stream } from 'xstream';
import { makeCollection } from 'cycle-onionify';
import {
  componentFactory,
  isolateExplicit,
} from '../../redstone/helpers/cycle-components';

import getMarkup from './markup';
import CyInput from '../../wood/cy-input';
import CyDropdown from '../../wood/cy-dropdown';
import CyButton from '../../wood/cy-button';
import CyCodeField from '../../wood/cy-code-field';

import styles from './styles.scss';

const defaultValues = {
  keyInput: {
    classNames: 'keyInput tableInput',
    placeholder: 'Key (id)',
  },
  valueInput: {
    classNames: 'valInput tableInput',
    placeholder: 'Value',
  },
  deleteButton: {
    classNames: 'delButton tableButton',
    text: 'Delete',
  },
  descriptionInput: {
    classNames: 'descInput tableInput',
    placeholder: 'Description',
  },
};

const defaultReducer$ = xs.of(prev => {
  console.log(typeof prev === 'undefined');
  return typeof prev === 'undefined' ? { ...defaultValues } : prev;
});

export default function(sources: { DOM: Stream, onion: Stream }) {
  const { state$ } = sources.onion;

  const makeInput = componentFactory(CyInput, sources);
  const makeButton = componentFactory(CyButton, sources);

  const keyInputSinks = makeInput('keyInput');
  const valueInputSinks = makeInput('valueInput');
  const deleteButtonSinks = makeButton('deleteButton');
  const descriptionInputSinks = makeInput('descriptionInput');

  const reducers$ = xs.merge(
    defaultReducer$,
    keyInputSinks.onion,
    valueInputSinks.onion,
    deleteButtonSinks.onion,
    descriptionInputSinks.onion,
  );

  const vdom$ = xs
    .combine(
      state$,
      keyInputSinks.DOM,
      valueInputSinks.DOM,
      deleteButtonSinks.DOM,
      descriptionInputSinks.DOM,
    )
    .map(getMarkup);

  return { DOM: vdom$, onion: reducers$ };
}
