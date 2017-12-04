/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';
// import { article } from '@cycle/dom';

export default function(sources) {
  const baseClassNames = ['articleContentPanel', 'contentPanel'].join(' ');

  const upstreamClick$ = sources.DOM.select('.articleContentPanel').events(
    'upstream-channel',
  );

  const props$ = sources.props;

  const vdom$ = props$
    .map(props => {
      const { className, content$ } = props;
      const classString = className
        ? `${className} ${baseClassNames}`
        : baseClassNames;
      return content$.map(content => (
        <article className={classString}>{content}</article>
      ));
    })
    .flatten();

  return { DOM: vdom$, upstream$: upstreamClick$ };
}
