import React from "react";
import './Card.css';

export const Card = ({alt, src, title, subtitle}) => {
    return (
        <div className="Card">
            <img className="Card-image" alt={alt} src={src}/>
            <p className="Card-title">{title}</p>
            <p className="Card-subtitle">{subtitle}</p>
        </div>
    );
}