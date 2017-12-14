// @flow
import Snabbdom from 'snabbdom-pragma';

export default function(
  [state, mainContent, asideContent, appConsole, topNavMenu]: [
    any,
    any,
    any,
    any,
    any,
  ],
) {
  return (
    <div className="masterLayout">
      <header>
        <hgroup>
          <h1>NAco</h1>
          <h2>Mockomatic Proxy</h2>
        </hgroup>
      </header>

      {topNavMenu}

      <section>{mainContent}</section>

      <aside>{asideContent}</aside>

      <hr />
      {appConsole}
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}
