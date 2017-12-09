// @flow
declare var module: {
  hot: {
    accept: (path: ?(string | string[]), callback: ?() => mixed) => void,
    dispose: (callback: ?() => void) => void,
  }
}
