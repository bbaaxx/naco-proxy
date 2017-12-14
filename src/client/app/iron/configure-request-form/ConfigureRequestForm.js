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
  ONION: Stream,
}) {
  const { props$ } = sources;
  const { state$ } = sources.ONION;

  const makeButton = componentFactory(CyButton, sources);
  const makeCodeField = componentFactory(CyCodeField, sources);
  const makeInput = componentFactory(CyInput, sources);
  const makeDropdown = componentFactory(CyDropdown, sources);

  const validateBtnSinks = makeButton('validateBtn', {
    classNames: 'validateBtn',
    text: 'validate',
  });
  const urlInputSinks = makeInput('urlInput', {
    classNames: 'urlInput inputLarge',
    placeholder: 'Provide a URL',
  });
  const codeFieldSinks = makeCodeField('codeField', {
    classNames: 'codeField',
    initialValue: '{"put": "your", "json response": "here"}',
  });
  const methodDropdownSinks = makeDropdown('methodDropdown', {
    classNames: 'methodDropdown',
    unselectedDefault: 'Select a method',
    options: [
      { value: 'get', text: 'GET' },
      { value: 'post', text: 'POST' },
      { value: 'put', text: 'PUT' },
    ],
  });

  const keyInputSinks = makeInput('keyInput', {
    classNames: 'keyInput tableInput',
    placeholder: 'Key (id)',
  });
  const valInputSinks = makeInput('valInput', {
    classNames: 'valInput tableInput',
    placeholder: 'Value',
  });
  const descInputSinks = makeInput('descInput', {
    classNames: 'descInput tableInput',
    placeholder: 'Description',
  });

  const methodSwitchReducer$ = validateBtnSinks.clicks$.mapTo(
    methodSwitchReducer('yolo'),
  );

  const reducers$ = xs.merge(
    defaultReducer$,
    methodSwitchReducer$,
    urlInputSinks.ONION,
    codeFieldSinks.ONION,
    methodDropdownSinks.ONION,
    keyInputSinks.ONION,
    valInputSinks.ONION,
    descInputSinks.ONION,
  );

  const vdom$ = xs
    .combine(
      props$,
      state$,
      validateBtnSinks.DOM,
      urlInputSinks.DOM,
      codeFieldSinks.DOM,
      methodDropdownSinks.DOM,
      keyInputSinks.DOM,
      valInputSinks.DOM,
      descInputSinks.DOM,
    )
    .map(getMarkup);

  return { DOM: vdom$, ONION: reducers$ };
}
