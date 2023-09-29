import React from "react";
import cssStyles from "./Input.module.scss";

const Input = ({onChange}) => {
    return <input className={cssStyles.Input} onChange={onChange} />;
};
const Textarea = ({onChange}) => {
    return <textarea className={cssStyles.Textarea} onChange={onChange}></textarea>;
};
export { Input, Textarea };
