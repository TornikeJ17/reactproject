import React, { useState } from "react";
import cssStyles from "./Login.module.scss";

const Login = ({ dataUser }) => {
    const [login, setLogin] = useState(false);

    return (
        <div className={cssStyles.LoginContainer}>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
