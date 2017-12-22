// @flow-
import xs from 'xstream';
import isolate from '@cycle/isolate';

// This one is pure
export function isolateExplicit(component, scope = null, sources, props = {}) {
  return isolate(component, scope)({ ...sources, props$: xs.of(props) });
}

// This one is not
export function isolateImplicit(component, sources, props = {}) {
  return isolate(component)({ ...sources, props$: xs.of(props) });
}
