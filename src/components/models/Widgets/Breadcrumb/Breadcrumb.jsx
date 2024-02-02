import React from "react";
import cssStyles from "./Breadcrumb.module.scss";
import { Link, useLocation } from "react-router-dom";
import { buttonIcons } from "../../Icons/Icons";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    let fullPath = ""; // This will accumulate the full path as we iterate through pathnames

    return (
        <div className={cssStyles.breadcrumb}>
            {pathnames.length > 0 && (
                <Link className={cssStyles.Alink} to="/">
                    {buttonIcons[20].icon}Home {buttonIcons[19].icon}
                </Link>
            )}
            {pathnames.map((name, index) => {
                fullPath += `/${name}`; // Accumulate the path
                const isLast = index === pathnames.length - 1;
                return (
                    <>
                        {isLast ? (
                            <span className={cssStyles.current}>
                                {name.toUpperCase()}
                            </span>
                        ) : (
                            <Link className={cssStyles.Alink} to={fullPath}>
                                {name.toUpperCase()} {buttonIcons[19].icon}
                            </Link>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
