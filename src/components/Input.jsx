import React from "react";
import "./Input.css";

export const Input = ({ type = "text", placeholder, onChange, value }) => {
  //деструктуризация идет. Либо можно{type, placeholder}
  //type="text" подстановка дефолтного значения
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="Input"
      onChange={onChange}
      value={value}
    />
  );
};
