import React from "react";
import cssStyles from "./Cards.module.scss";

const Cards = ({ width, height, color, element, border, overflow,onClick }) => {
    return (
        <div
            onClick={onClick}
            className={cssStyles.CardsContainer}
            style={{
                width: width,
                height: height,
                color: color,
                borderRadius: border,
                overflowY: overflow,
            }}
        >
            {element}
        </div>
    );
};

export default Cards;
