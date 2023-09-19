import React from "react";
import cssStyles from "./Button.module.scss";

const Button = ({ icon, title, width,height,background, onClick }) => {
    return (
        <button 
            className={cssStyles.Button}
            onClick={onClick}
            style={{
                width: width,
                height:height,
                background:background
            }}
        >
            <div>{icon}</div>
            <div>{title}</div>
        </button>
    );
};

export default Button;
