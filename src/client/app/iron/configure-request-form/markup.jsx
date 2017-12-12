// @flow
import Snabbdom from 'snabbdom-pragma';

export default function(
  [props, state, validateBtn, urlInput, codeField, methodDropdown]: any[],
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
        <div>{codeField}</div>
      </form>
    </div>
  );
}
