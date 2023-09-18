import React from "react";
import cssStyles from "./Cards.module.scss";

const Cards = ({
    width,
    height,
    color,
    element,
}) => {
    return (
        <div
            className={cssStyles.CardsContainer}
            style={{
                width: width,
                height: height,
                color: color,
            }}
        >
            {element}
        </div>
    );
};

export default Cards;
