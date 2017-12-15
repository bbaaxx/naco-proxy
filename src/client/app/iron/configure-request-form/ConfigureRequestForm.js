// @flow
import xs, { Stream } from 'xstream';
import { componentFactory } from '../../redstone/helpers/cycle-components';
import styles from './styles.scss';

import CyInput from '../../wood/cy-input';
import CyDropdown from '../../wood/cy-dropdown';
import CyButton from '../../wood/cy-button';
import CyCodeField from '../../wood/cy-code-field';
import RequestParamsInput from '../request-params-input';

import getMarkup from './markup';

const defaultValues = {};
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

  const makeButton = componentFactory(CyButton, sources);
  const makeCodeField = componentFactory(CyCodeField, sources);
  const makeInput = componentFactory(CyInput, sources);
  const makeDropdown = componentFactory(CyDropdown, sources);
  const makeParamsInput = componentFactory(RequestParamsInput, sources);

  const validateBtnSinks = makeButton('validateBtn', {
    classNames: 'validateBtn mainButton',
    text: 'Validate',
  });
  const sendBtnSinks = makeButton('sendBtn', {
    classNames: 'sendBtn mainButton',
    text: 'Send',
  });
  const urlInputSinks = makeInput('urlInput', {
    classNames: 'urlInput inputLarge',
    placeholder: 'Provide a URL (Target URI)',
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

  const requestParamsInputSinks = makeParamsInput('requestParamsInput', {
    classNames: 'rpi',
  });

  const methodSwitchReducer$ = validateBtnSinks.clicks$.mapTo(
    methodSwitchReducer('yolo'),
  );

  const reducers$ = xs.merge(
    defaultReducer$,
    methodSwitchReducer$,
    urlInputSinks.onion,
    codeFieldSinks.onion,
    methodDropdownSinks.onion,
    requestParamsInputSinks.onion,
  );

  const vdom$ = xs
    .combine(
      props$,
      state$,
      validateBtnSinks.DOM,
      sendBtnSinks.DOM,
      urlInputSinks.DOM,
      codeFieldSinks.DOM,
      methodDropdownSinks.DOM,
      requestParamsInputSinks.DOM,
    )
    .map(getMarkup);

  return { DOM: vdom$, onion: reducers$ };
}
