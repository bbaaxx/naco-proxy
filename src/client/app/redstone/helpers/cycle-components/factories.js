/** @jsx html */
// @flow-
import xs from 'xstream';
import isolate from '@cycle/isolate';
import { isolateExplicit } from './isolators';

export const componentFactory = (component, sources) => (uId, props) =>
  isolateExplicit(component, uId, sources, props);
