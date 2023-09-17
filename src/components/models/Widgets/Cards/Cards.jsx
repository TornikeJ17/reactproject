import React from "react";
import cssStyles from "./Cards.module.scss";

const Cards = ({
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
            className={cssStyles.CardsContainer}
            style={{
                width: width,
                height: height,
                backgroundColor: background,
                color: color,
            }}
        >
            <div className={cssStyles.CardsTitleContainer}>
                <div className={cssStyles.CardsTitle}>{title}</div>
                {text?.length > 0 ? (
                    <div className={cssStyles.CardsText}>{text}</div>
                ) : (
                    <div className={cssStyles.CardsText}>{number}</div>
                )}
            </div>
            <div className={cssStyles.CardsIcon}>{icon}</div>
        </div>
    );
};

export default Cards;
