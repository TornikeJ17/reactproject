import React, { useState, useEffect, useRef } from "react";
import cssStyles from "./styles/app.module.scss";
import Sidebar from "./components/Dashboard/Sidebar/Sidebar";
import Content from "./components/Dashboard/Content/Content";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const App = () => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [click, setClick] = useState(
        JSON.parse(localStorage.getItem("HideSidebar") || "false")
    );
    const toast = useRef(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const userData = localStorage.getItem("userData");
        setIsLoggedIn(!!token);
        setUser(userData ? JSON.parse(userData) : null);
    }, []);

    const handleLoginSuccess = (token, userDetails) => {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(userDetails));
        setIsLoggedIn(true);
        setUser(userDetails);
    };

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
        navigate("/");
    };

    const toggleSidebar = () => {
        const newValue = !click;
        setClick(newValue);
        localStorage.setItem("HideSidebar", JSON.stringify(newValue));
    };
    const accept = () => {
        handleLogout();
    };

    const logOutConfirm = () => {
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept,
        });
    };

    const containerClasses = `${cssStyles.Container} ${
        click ? cssStyles.expanded : cssStyles.collapsed
    }`;

    if (!isLoggedIn) {
        return (
            <div className={cssStyles.LoginRegisterContainer}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login
                                onLoginSuccess={handleLoginSuccess}
                                setShowLogin={setShowLogin}
                                showLogin={showLogin}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Register
                                setShowLogin={setShowLogin}
                                showLogin={showLogin}
                            />
                        }
                    />
                </Routes>
            </div>
        );
    }

    return (
        <div className={containerClasses}>
            <Toast ref={toast} />
            <Sidebar hide={click} />
            <Content
                hide={click}
                setClick={toggleSidebar}
                handleLogout={logOutConfirm}
                user={user}
            />
        </div>
    );
};

export default App;
