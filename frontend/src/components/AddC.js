import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const AddC = () => {
    const [text, setText] = useState("");
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("userinfo"))
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { text };
            const response = await fetch(`http://localhost:5000/comment/${id}/${user.User_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = `/comment/${id}`;
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Text</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={text} onChange={e => setText(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default AddC;