import React from "react";
import cssStyles from "./MediumCards.module.scss";

const MediumCards = ({
    width,
    height,
    color,
    background,
    title,
    text,
    icon,
}) => {
    return (
        <div
            className={cssStyles.MediumCardsContainer}
            style={{ width, height, backgroundColor: background, color }}
        >
            <div>hey</div>
        </div>
    );
};

export default MediumCards;
