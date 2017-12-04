/** @jsx html */
// @flow-
import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import BasicSlide from '../../wood/basic-slide';
import ArticleContentPanel from '../../iron/article-content-panel';
import { isolateImplicit } from '../../redstone/helpers/cycle-components';

function slideMarkupMaker(slide) {
  const { title, message } = slide;
  return (
    <div>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}

export function slideMakerMaker(sources) {
  return function slideMaker(slides) {
    return slides.map((slide, key) =>
      isolateImplicit(BasicSlide, sources, {
        className: `slide-${key}`,
        contents: slideMarkupMaker(slide),
      }),
    );
  };
}

export function panelMakerMaker(sources) {
  return function panelMaker(slides) {
    return slides.map((slide, key) =>
      ArticleContentPanel({
        DOM: sources.DOM,
        props: xs.of({ className: `yolo-n${key}`, content$: slide.DOM }),
      }),
    );
  };
}
