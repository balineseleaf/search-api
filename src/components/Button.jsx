import React from "react";
import "./Button.css";

export const Button = (props) => {
  // у каждого компонента есть вариативные параметры- пропсы
  return (
    <button className="Button" type={props.type}>
      {props.children}
    </button>
  );
};

//props.children - все, что мы вставим между тегами компонента Button  в App.js, можно получить через props.children
