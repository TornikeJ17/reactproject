import React from "react";
import cssStyles from "./Divider.module.scss"

const Divider = ({width,height,color}) => {
    return (
        <div 
        className={cssStyles.Divider}
        style={{
            width: width,
            height: height,
            backgroundColor: color
        }}
        
        >
            
        </div>
    )
}

export default Divider