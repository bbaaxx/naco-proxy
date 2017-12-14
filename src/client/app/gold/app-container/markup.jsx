// @flow
import Snabbdom from 'snabbdom-pragma';

export default function(
  [state, mainContent, asideContent, appConsole, topNavMenu]: any[],
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
      {mainContent}
      {asideContent}

      <hr />
      {appConsole}
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}
