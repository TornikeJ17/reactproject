import React from "react";
import cssStyles from "./Button.module.scss";

const Button = ({ icon, title, width,height,background,padding,gap, onClick,primary }) => {
    console.log(primary)
    return (
        <button 
            className={cssStyles.Button}
            onClick={onClick}
            style={{
                width: width,
                height:height,
                background: primary ? "#4318FF" : background,
                padding:padding,
                gap:gap,
                color:primary ? "#FFF" : "#1a1e21"
            }}
        >
            <div>{icon}</div>
            <div>{title}</div>
        </button>
    );
};

export default Button;
