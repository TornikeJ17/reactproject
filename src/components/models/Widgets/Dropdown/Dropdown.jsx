import React from "react";

const Dropdown = ({ select, options, onChange }) => {
    return (
        <div className="dropdown">
            <select onChange={onChange}>
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
