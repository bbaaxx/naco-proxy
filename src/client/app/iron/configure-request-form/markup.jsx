/** @jsx Snabbdom.createElement */
// @flow
import Snabbdom from 'snabbdom-pragma';

export default function(
  [props, state, validateBtn, urlInput, methodDropdown]: any[],
) {
  return (
    <div className={`configureRequestForm ${props.className || ''}`}>
      <form noValidate>
        {methodDropdown}
        <label>
          Target URI:
          {urlInput}
        </label>
        {validateBtn}
      </form>
    </div>
  );
}
