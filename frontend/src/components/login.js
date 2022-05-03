import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

const Login = () => {
    const [inputs, setInputs] = useState({
        uname: "",
        pass: ""
    });

    const { uname, pass } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { uname, pass };
            const response = await fetch(
                "http://localhost:5000/auth/login",
                {
                method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();

            if (parseRes.jwt_token) {
                localStorage.setItem("token", parseRes.jwt_token);
                //setAuth(true);
                toast.success("Logged in Successfully");
            } else {
                //setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="mt-5 text-center">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="uname"
                    value={uname}
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="text"
                    name="pass"
                    value={pass}
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <button class="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">register</Link>
        </Fragment>
    );
};

export default Login;