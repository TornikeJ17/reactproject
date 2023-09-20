import React from "react";
import cssStyles from "./Input.module.scss";

const Input = () => {
    return <input className={cssStyles.Input} />;
};
const Textarea = () => {
    return <textarea className={cssStyles.Textarea}></textarea>;
};
export { Input, Textarea };
