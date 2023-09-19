import React from "react";
import cssStyles from "./Cards.module.scss";

const Cards = ({
    width,
    height,
    color,
    element,
    border
}) => {
    return (
        <div
            className={cssStyles.CardsContainer}
            style={{
                width: width,
                height: height,
                color: color,
                borderRadius: border
            }}
        >
            {element}
        </div>
    );
};

export default Cards;
