import React from "react";
import cssStyles from './Dropdown.module.scss'
const Dropdown = ({ select, options, onChange,width }) => {
    return (
        <div className={cssStyles.dropdown}>
            <select value={select} onChange={onChange} style={{width:width}}>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
