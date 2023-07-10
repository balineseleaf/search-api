import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export const Card = ({ alt, src, title, subtitle, id }) => {
  return (
    <Link to={`/photos/${id}`}>
      <div className="Card">
        <img className="Card-image" alt={alt} src={src} />
        <p className="Card-title">{title}</p>
        <p className="Card-subtitle">{subtitle}</p>
      </div>
    </Link>
  );
};
