/** @jsx html */
// @flow-
import { html } from 'snabbdom-jsx';

export default function([scrollPosition, scrollButton, mainContent]) {
  return (
    <div className="mainContainer">
      <header>
        <hgroup>
          <h1>Header</h1>
          <h2>SubHeader</h2>
        </hgroup>
      </header>
      <nav>
        <ul>
          <li>
            <a href="/somewhere">Somewhere</a>
          </li>
          <li>
            <a href="/elsewhere">Elsewhere</a>
          </li>
        </ul>
      </nav>
      {mainContent}
      <aside>
        <section>aside</section>
      </aside>
      <div className="scroll-display">
        <span>{scrollPosition}</span>
        {scrollButton}
      </div>
    </div>
  );
}
