// @flow
import Snabbdom from 'snabbdom-pragma';

export default function(
  [state, mainContent, asideContent, appConsole, topNavMenu]: any[],
) {
  return (
    <div className="masterLayout">
      <header className="appContainerHeader">
        <hgroup>
          <h1>
            N<span className="headLil">GOB</span>A<span className="headLil">
              utomatically
            </span>C<span className="headLil">onfigurable</span>O<span className="headLil">
              verrider
            </span>
          </h1>
          <h2>Mockomatic Proxy</h2>
        </hgroup>
      </header>
      <div className="topNavMenuContainer">{topNavMenu}</div>
      {mainContent}
      {asideContent}

      <hr />
      <wc-canvas />
      {appConsole}
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}
