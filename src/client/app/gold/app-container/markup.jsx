// @flow
import Snabbdom from 'snabbdom-pragma';

export default function(
  [state, mainContent, asideContent, appConsole]: [any, any, any, any],
) {
  return (
    <div className="masterLayout">
      <header>
        <hgroup>
          <h1>NAco</h1>
          <h2>Mockomatic Proxy</h2>
        </hgroup>
      </header>

      <nav>
        <ul className="navLinks">
          <li>
            <wcmdl-button>New request</wcmdl-button>
          </li>
          <li>
            <wcmdl-button ripple colored>
              New Collection
            </wcmdl-button>
          </li>
        </ul>
      </nav>

      <section>{mainContent}</section>

      <aside>{asideContent}</aside>

      <hr />
      {appConsole}
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}
