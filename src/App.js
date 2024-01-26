import React, { useState, useEffect, useRef } from "react";
import cssStyles from "./styles/app.module.scss";
import Sidebar from "./components/Dashboard/Sidebar/Sidebar";
import Content from "./components/Dashboard/Content/Content";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const BackgroundSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 800"
        className="fixed left-0 top-0 min-h-screen min-w-screen"
        preserveAspectRatio="none"
        style={{ position: "absolute", height: "100vh", width: "100%" }}
    >
        <path fill="#0891b2" d="M0 0h1600v800H0z" />
        <path
            fill="#06b6d4"
            d="M478.4 581c3.2.8 6.4 1.7 9.5 2.5C684.1 636 876.6 717 1081.4 760.1c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9 107.3-6.6 214.6 10.2 317.3 37z"
        />
        <path
            fill="#08c6e6"
            d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1 2.8 1.1 5.5 2.3 8.3 3.4 171 71.6 342.7 158.5 531.3 207.7 198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2a483.5 483.5 0 0 1 181.8-23.8z"
        />
        <path
            fill="#3be3ff"
            d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3 12.8-4.1 25.4-8.4 38.1-12.9V0h-1312c56 21.3 108.7 50.6 159.7 82 2.4 1.4 4.7 2.9 7.1 4.3z"
        />
        <path
            fill="#87eeff"
            d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8 21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4 174.9 70.7 368.7 88.7 552 47.4z"
        />
    </svg>
);

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

    const reject = () => {
        toast.current.show({
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected",
            life: 1500,
        });
    };
    const logOutConfirm = () => {
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept,
            reject,
        });
    };

    const containerClasses = `${cssStyles.Container} ${
        click ? cssStyles.expanded : cssStyles.collapsed
    }`;

    if (!isLoggedIn) {
        return (
            <div>
                <BackgroundSVG />
                {!showLogin ? (
                    <Login
                        onLoginSuccess={handleLoginSuccess}
                        setShowLogin={setShowLogin}
                        showLogin={showLogin}
                    />
                ) : (
                    <Register
                        setShowLogin={setShowLogin}
                        showLogin={showLogin}
                    />
                )}
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
