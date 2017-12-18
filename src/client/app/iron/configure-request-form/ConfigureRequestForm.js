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

const initialValues = {
  sendBtn: {
    classNames: 'sendBtn mainButton',
    text: 'Send',
  },
  validateBtn: {
    classNames: 'validateBtn mainButton',
    text: 'Validate',
  },
  urlInput: {
    classNames: 'urlInput inputLarge',
    placeholder: 'Provide a URL (Target URI)',
  },
  codeField: {
    classNames: 'codeField',
    value: '{"put": "your", "json response": "here"}',
  },
  methodDropdown: {
    classNames: 'methodDropdown',
    unselectedDefault: 'Method',
    options: [
      { value: 'get', text: 'GET' },
      { value: 'post', text: 'POST' },
      { value: 'put', text: 'PUT' },
    ],
  },
  requestParamsInput: {
    classNames: 'rpi',
  },
};

const defaultReducer$ = xs.of(
  prev =>
    typeof prev === 'undefined' ? initialValues : { ...initialValues, ...prev },
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

  const validateBtnSinks = makeButton('validateBtn');
  const sendBtnSinks = makeButton('sendBtn');
  const urlInputSinks = makeInput('urlInput');
  const codeFieldSinks = makeCodeField('codeField');
  const methodDropdownSinks = makeDropdown('methodDropdown');
  const requestParamsInputSinks = makeParamsInput('requestParamsInput');

  let request$ = xs.of({
    url: 'http://localhost:3838/version', // GET method by default
    category: 'apiVersion',
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

  return { DOM: vdom$, HTTP: request$, onion: reducers$ };
}
