// @flow
import xs, { Stream } from 'xstream';
import { DOMSource } from '@cycle/dom';
import { makeCollection } from 'cycle-onionify';
import {
  componentFactory,
  isolateExplicit,
} from '../../redstone/helpers/cycle-components';

import RequestParamsInputs from '../request-params-inputs';
import CyInput from '../../wood/cy-input';
import CyDropdown from '../../wood/cy-dropdown';
import CyButton from '../../wood/cy-button';
import CyCodeField from '../../wood/cy-code-field';

import getMarkup from './markup';
import styles from './styles.scss';

const defaultValues = {
  mode: 'get',
  paramsList: [
    {
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
    },
    undefined,
    undefined,
  ],
};
const defaultReducer$ = xs.of(
  prev => (typeof prev === 'undefined' ? { ...defaultValues } : prev),
);
const methodSwitchReducer = mode => prev => ({ ...prev, mode });

export default function(sources: { DOM: DOMSource, onion: Stream }) {
  const { state$ } = sources.onion;

  const ParamsList = makeCollection({
    item: RequestParamsInputs,
    itemScope: key => key,
    collectSinks: instances => ({
      onion: instances.pickMerge('onion'),
      DOM: instances.pickCombine('DOM'),
    }),
  });
  const paramsListSinks = isolateExplicit(ParamsList, 'paramsList', sources);

  return {
    DOM: xs.combine(state$, paramsListSinks.DOM).map(getMarkup),
    onion: xs.merge(defaultReducer$, paramsListSinks.onion),
  };
}
