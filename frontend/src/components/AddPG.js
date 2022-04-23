import React, { Fragment, useState } from "react";

const AddPG = () => {
    const [name, setName] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch("http://localhost:5000/priv_genre", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>All Private Genres</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button>Add</button>
            </form>
        </Fragment>
    );
};

export default AddPG;