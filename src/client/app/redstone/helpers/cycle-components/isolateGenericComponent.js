/** @jsx html */
// @flow-
import xs from 'xstream';
import isolate from '@cycle/isolate';

// This one is pure
export function isolateExplicit(component, id = null, sources, props = {}) {
  return isolate(component, id)({ ...sources, props$: xs.of(props) });
}

// This one is not
export function isolateImplicit(component, sources, props = {}) {
  return isolate(component)({ ...sources, props$: xs.of(props) });
}
