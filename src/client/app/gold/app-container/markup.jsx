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
            <span className="headLil">NGOB</span>
            <span className="headLil">Automatically</span>
            <span className="headLil">Configurable</span>
            <span className="headLil">Overrider</span>
          </h1>
          <h2>Mockomatic Proxy</h2>
        </hgroup>
      </header>
      <div className="topNavMenuContainer">{topNavMenu}</div>
      {mainContent}
      {asideContent}
      <hr />
      <wc-canvas
        className="fullBg"
        attrs={{
          'dark-color': '#eee',
          'light-color': '#fff',
          'square-len': '20',
        }}
      />
      {appConsole}
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}
