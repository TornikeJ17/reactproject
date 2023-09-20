import React from "react";
import cssStyles from './Label.module.scss'

const Label = ({title}) => {
    return (
        <div className={cssStyles.LabelContainer}>
            <span className={cssStyles.LabelSpan}>{title}</span>
        </div>
    )
}

export default Label 