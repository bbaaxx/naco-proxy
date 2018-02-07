// @flow
import xs from 'xstream';
import { adapt } from '@cycle/run/lib/adapt';

export default function makeScrollDriver(options: {
  duration: number,
  element?: HTMLElement,
}) {
  return function ScrollDriver(sink$: { addListener: (listener: {}) => void }) {
    const scrollTo = (element, pos, duration = 600) => {
      if (Number.isNaN(Number(pos)) || duration <= 0) return;
      if (!element) return;
      const diff = pos - element.scrollTop;
      const perTick = diff / duration * 10;
      setTimeout(() => {
        if (!element) return;
        element.scrollTop += perTick; // eslint-disable-line
        if (element.scrollTop === pos) return;
        scrollTo(element, pos, duration - 10);
      });
    };

    const listener = {
      next: offsetTop => {
        scrollTo(options.element || document.body, offsetTop, options.duration);
      },
    };

    sink$.addListener(listener);

    const producer = {
      start(_listener) {
        this.eventHandler = () => _listener.next(Number(window.scrollY));
        window.addEventListener('scroll', this.eventHandler);
      },
      stop() {
        window.removeEventListener('scroll', this.eventHandler);
      },
    };

    return adapt(xs.createWithMemory(producer).startWith(window.scrollY));
  };
}
