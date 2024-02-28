import React, { useState } from "react";
import cssStyles from "./Login.module.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useRequestDataProvider from "../../api/useRequestDataProvider";
import { redirect, useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Card } from "primereact/card";

const Login = ({ onLoginSuccess, setShowLogin, showLogin }) => {
    const { UserLogin } = useRequestDataProvider();
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const handleInputChangelogin = (e) => {
        setShowLogin(true);
        navigate("/register");
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await UserLogin(loginDetails);

            if (response.token && response.userDetails) {
                localStorage.setItem("userToken", response.token);
                localStorage.setItem(
                    "userDetails",
                    JSON.stringify(response.userDetails)
                );
            }
            if (onLoginSuccess) {
                onLoginSuccess(response.token, response.userDetails);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle error (e.g. show error message to the user)
        }
    };
    return (
        <Card className={cssStyles.LoginContainer}>
            <form onSubmit={login} className={cssStyles.LoginForm}>
                <div className={cssStyles.Title}>
                    <h1>Login</h1>
                    <h5>Please enter your details</h5>
                </div>
                <InputText
                    name="email"
                    value={loginDetails.email}
                    onChange={handleInputChange}
                    placeholder="email"
                />
                <InputText
                    name="password"
                    value={loginDetails.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    type="password"
                />
                <Button label="Login" />
            </form>
            <div
                onClick={() => handleInputChangelogin()}
                className={cssStyles.toggleAuthButton}
            >
                {!showLogin
                    ? "Need an account? Register"
                    : "I am already member"}
            </div>
        </Card>
    );
};

export default Login;
