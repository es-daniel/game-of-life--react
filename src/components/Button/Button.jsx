import React from "react";
import cx from "classname";
import "./Button.scss";

const Button = ({ type, children, onClick, value }) => {
  return (
    <button 
        value={value}
        onClick={onClick} 
        className={cx(`button button--${type}`)}
    >
      {children}
    </button>
  );
};

export default Button;
