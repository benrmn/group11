// Dean worked on this file
import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

/*
This page allows
a new user to register on the website
*/

const Register = () => {
    const [inputs, setInputs] = useState({
        fname: "",
        lname: "",
        uname: "",
        pass: ""
    });

    const { fname, lname, uname, pass } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    // this function creates a new user
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { fname, lname, uname, pass };
            const response = await fetch(
                "http://localhost:5000/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            // reroute the user to the login page so they can login
            window.location = '/login';
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        // display the html page with reigstration information
        <Fragment>
            <h1 className="mt-5 text-center">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="fname"
                    value={fname}
                    placeholder="fname"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="text"
                    name="lname"
                    value={lname}
                    placeholder="lname"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="text"
                    name="uname"
                    value={uname}
                    placeholder="uname"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="pass"
                    name="pass"
                    value={pass}
                    placeholder="pass"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">login</Link>
        </Fragment>
    );
};

export default Register;