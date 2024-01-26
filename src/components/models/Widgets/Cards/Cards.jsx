import React from "react";
import cssStyles from "./Cards.module.scss";

const Cards = ({
    width,
    maxWidth,
    height,
    color,
    element,
    border,
    overflow,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className={cssStyles.CardsContainer}
            style={{
                width: width,
                maxWidth: maxWidth,
                height: height,
                color: color,
                borderRadius: border,
                overflowY: overflow,
                border: "1px solid #dfe7ef",
            }}
        >
            {element}
        </div>
    );
};

export default Cards;
