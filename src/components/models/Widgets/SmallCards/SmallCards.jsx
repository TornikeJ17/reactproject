import React from "react";
import cssStyles from "./SmallCards.module.scss";

const SmallCards = ({
    width,
    height,
    color,
    background,
    title,
    text,
    number,
    icon,
}) => {
    return (
        <div
            className={cssStyles.SmallCardsContainer}
            style={{
                width: width,
                height: height,
                backgroundColor: background,
                color: color,
            }}
        >
            <div className={cssStyles.SmallCardsTitleContainer}>
                <div className={cssStyles.SmallCardsTitle}>{title}</div>
                {text?.length > 0 ? (
                    <div className={cssStyles.SmallCardsText}>{text}</div>
                ) : (
                    <div className={cssStyles.SmallCardsText}>{number}</div>
                )}
            </div>
            <div className={cssStyles.SmallCardsIcon}>{icon}</div>
        </div>
    );
};

export default SmallCards;
