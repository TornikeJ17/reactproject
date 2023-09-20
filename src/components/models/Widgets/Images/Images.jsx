import React from "react";

const Images = ({ icon, onChange }) => {
    return (
        <div>
            {icon}
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                ref={(input) => input && input.click()}
            />
        </div>
    );
};

export default Images;
