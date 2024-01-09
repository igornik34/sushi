import React, { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(function Input({ input, label, className = "" }, ref) {
  return (
    <div className={`${classes.input} ${className}`}>
      {label && <label htmlFor={input.id}>{label}</label>}
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
