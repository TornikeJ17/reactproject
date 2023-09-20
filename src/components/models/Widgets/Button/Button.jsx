import React from "react";
import cssStyles from "./Button.module.scss";

const Button = ({ icon, title, width,height,background,padding,gap, onClick }) => {
    return (
        <button 
            className={cssStyles.Button}
            onClick={onClick}
            style={{
                width: width,
                height:height,
                background:background,
                padding:padding,
                gap:gap
            }}
        >
            <div>{icon}</div>
            <div>{title}</div>
        </button>
    );
};

export default Button;
