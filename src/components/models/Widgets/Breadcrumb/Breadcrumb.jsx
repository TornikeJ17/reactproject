import React from "react";

import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    console.log(location);
    return (
        <div className="breadcrumb">
            {pathnames.map((name, index) => {
                const isLast = index === pathnames.length - 1;
                return (
                    <span key={name}>
                        {name.toUpperCase()}
                        {!isLast && "/"}
                    </span>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
