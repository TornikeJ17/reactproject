import React from "react";
import cssStyles from "./Button.module.scss";

const Button = ({ icon, title, width,height,background,padding,gap, onClick,primary,color,type}) => {
    return (
        <button 
            type={type}
            className={cssStyles.Button}
            onClick={onClick}
            style={{
                width: width,
                height:height,
                background: primary ? "#4318FF" : background,
                padding:padding,
                gap:gap,
                color:primary ? color : color 
            }}
        >
            <div>{icon}</div>
            <div>{title}</div>
        </button>
    );
};

export default Button;
