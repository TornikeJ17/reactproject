import React from "react";
import cssStyles from "./Input.module.scss";

const Input = ({onChange,value}) => {
    return <input className={cssStyles.Input} onChange={onChange} />;
};
const Textarea = ({onChange,value}) => {
    return <textarea className={cssStyles.Textarea} value={value} onChange={onChange}></textarea>;
};
export { Input, Textarea };
