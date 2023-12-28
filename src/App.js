import React, { useEffect, useState } from "react";
import cssStyles from "./styles/app.module.scss";
import Sidebar from "./components/Dashboard/Sidebar/Sidebar";
import Content from "./components/Dashboard/Content/Content";
import Login from "./components/Auth/Login/Login";

const App = () => {
    const [click, setClick] = useState(
        JSON.parse(localStorage.getItem("HideSidebar"))
    );
    const toggleSidebar = () => {
        const newValue = !click;
        setClick(newValue);
        localStorage.setItem("HideSidebar", JSON.stringify(newValue));
    };

    const containerClasses = !click
        ? `${cssStyles.Container} ${cssStyles.collapsed}`
        : `${cssStyles.Container} ${cssStyles.expanded}`;
    return (
        <div className={containerClasses}>
            <Sidebar hide={click} />
            <Content hide={click} setClick={toggleSidebar} />
        </div>
    );
};

export default App;
