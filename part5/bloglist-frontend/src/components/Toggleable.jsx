import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from 'prop-types';

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisiblity,
    };
  });
  
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable;
