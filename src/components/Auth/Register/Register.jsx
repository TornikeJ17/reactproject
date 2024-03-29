import React, { useState } from "react";
import cssStyles from "./Register.module.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useRequestDataProvider from "../../api/useRequestDataProvider";
import { redirect, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
const Register = ({ onLoginSuccess, setShowLogin, showLogin }) => {
    const { UserRegistration } = useRequestDataProvider();
    const navigate = useNavigate();
    const [registerDetails, setRegisterDetails] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    const handleInputChangeregister = (e) => {
        const { name, value } = e.target;
        setRegisterDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleInputChangelogin = (e) => {
        setShowLogin(false);
        navigate("/");
    };
    const register = async (e) => {
        e.preventDefault();
        try {
            await UserRegistration(registerDetails);
            redirect("/login"); // Handle success (e.g. navigate to dashboard, store token, etc.)
        } catch (error) {
            console.error("Error during registration:", error);
            // Handle error (e.g. show error message to the user)
        }
    };
    return (
        <Card className={cssStyles.RegisterContainer}>
            <form onSubmit={register} className={cssStyles.RegisterForm}>
                <div className={cssStyles.Title}>
                    <h1>Register</h1>
                    <h5>Please enter your details</h5>
                </div>
                <InputText
                    name="email"
                    value={registerDetails.email}
                    onChange={handleInputChangeregister}
                    placeholder="Email"
                />
                <InputText
                    name="firstName"
                    value={registerDetails.firstName}
                    onChange={handleInputChangeregister}
                    placeholder="First Name"
                />
                <InputText
                    name="lastName"
                    value={registerDetails.lastName}
                    onChange={handleInputChangeregister}
                    placeholder="Last Name"
                />
                <InputText
                    name="password"
                    value={registerDetails.password}
                    onChange={handleInputChangeregister}
                    placeholder="Password"
                    type="password" // Use the password type for security
                />
                <Button label="Register" />
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

export default Register;
