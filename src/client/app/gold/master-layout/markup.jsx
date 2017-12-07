/** @jsx html */
import { html } from 'snabbdom-jsx';

export default function([mainContent, scrollPosition, scrollButton]) {
  return (
    <div className="mainContainer">
      <header>
        <hgroup>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
        </hgroup>
      </header>
      <nav>
        <ul>
          <li>
            <a href="/somewhere">Thiswhere</a>
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
