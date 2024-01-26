import React, { useState } from "react";
import cssStyles from "./Login.module.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useRequestDataProvider from "../../api/useRequestDataProvider";
import { useNavigate } from "react-router-dom";
const Login = ({ onLoginSuccess, setShowLogin, showLogin }) => {
    const { UserLogin } = useRequestDataProvider();
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

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
            console.log("Login successful:", response);

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
        <div className={cssStyles.LoginContainer}>
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
                    type="password" // Use password type for security
                />
                <Button label="Login" />
            </form>
            <button
                onClick={() => setShowLogin(!showLogin)}
                className={cssStyles.toggleAuthButton}
                style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                }}
            >
                {!showLogin
                    ? "Need an account? Register"
                    : "Have an account? Login"}
            </button>
        </div>
    );
};

export default Login;
