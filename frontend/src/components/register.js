import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from 'react-bootstrap';


const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        fname: "",
        lname: "",
        uname: "",
        pass: ""
    });

    const { fname, lname, uname, pass } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

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

            if (parseRes.length !== 0) {
                setAuth(true);
                toast.success("Register Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
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