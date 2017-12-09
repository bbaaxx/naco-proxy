/** @jsx Snabbdom.createElement */
// @flow
import Snabbdom from 'snabbdom-pragma';

export default function(
  [state, mainContent, asideContent, appConsole]: [any, any, any, any],
) {
  return (
    <div className="masterLayout">
      <header>
        <hgroup>
          <h1>Header</h1>
          <h2>SubHeader</h2>
        </hgroup>
      </header>

      <nav>
        <ul>
          <li>
            <wcmdl-button>Somewhere</wcmdl-button>
          </li>
          <li>
            <wcmdl-button ripple colored>
              Elsewhere
            </wcmdl-button>
          </li>
        </ul>
      </nav>

      <section>{mainContent}</section>

      <aside>{asideContent}</aside>

      {appConsole}
      <hr />
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}
