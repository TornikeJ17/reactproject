import React, { useState } from "react";
import cssStyles from "./styles/app.module.scss";
import Sidebar from "./components/Dashboard/Sidebar/Sidebar";
import Content from "./components/Dashboard/Content/Content";

const App = () => {
    return (
        <div className={cssStyles.Container}>
            <Sidebar />
            <Content />
        </div>
    );
};

export default App;
