import React, { useState } from "react";
import styles from "./StarRating.module.scss";

const StarRating = ({
    totalStars = 5,
    initialRating = 0,
    onRate = (rating) => {},
}) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index + 1);
        onRate(index + 1);
    };

    const handleStarMouseOver = (index) => {
        setHoverRating(index + 1);
    };

    const handleStarMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div>
            {[...Array(totalStars)].map((_, index) => (
                <div
                    key={index}
                    className={`${styles.starContainer} ${
                        (hoverRating || rating) > index ? styles.active : ""
                    }`}
                    onClick={() => handleStarClick(index)}
                    onMouseOver={() => handleStarMouseOver(index)}
                    onMouseLeave={handleStarMouseLeave}
                >
                    <span>★</span>
                </div>
            ))}
        </div>
    );
};

export default StarRating;
