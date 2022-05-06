//Ben wrote this file
import React, { Fragment, useState } from "react";

const AddPG = () => {
    const [name, setName] = useState("");

    // get all private topics from db where isPrivate = true
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch(`http://localhost:5000/priv_genre`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // on refresh we want to stay on the same page
            window.location = "/priv_genre";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Private Topic's</h1>
            {/* form for submiting a new private topic */}
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default AddPG;