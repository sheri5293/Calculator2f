/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Button = ({ id, children, onClick }) => (
  <button id={id} onClick={onClick}>
    {children}
  </button>
);
export default Button;
