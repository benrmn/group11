import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const FindLogin = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const Login = async e => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            console.log(jsonData);

            localStorage.setItem('loginattempt', JSON.stringify(body))
            localStorage.setItem('userinfo',JSON.stringify(jsonData))

            window.location = '/';

        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <Fragment>
            <h1 className="text-center mt-5">Login</h1>
            <form onSubmit={Login}>
                    <input
                        type="text"
                        className="form-control my-3"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control my-3"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                <button className="btn btn-success btn-block">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    );
};

export default FindLogin;