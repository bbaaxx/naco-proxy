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

export const componentFactory = (component, sources) => (uId, props) =>
  isolateExplicit(component, uId, sources, props);
