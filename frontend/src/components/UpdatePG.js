import React, { Fragment, useState } from "react";

const UpdatePG = ({ pgenre }) => {
    const [name, setName] = useState(pgenre.name);

    //edit description function

    const updateName = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch(
                `http://localhost:5000/priv_genre/${pgenre.pgenre_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                class="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${pgenre.pgenre_id}`}
            >
                Edit
            </button>

            { }
            <div
                class="modal"
                id={`id${pgenre.pgenre_id}`}
                onClick={() => setName(pgenre.name)}
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Genre</h4>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                onClick={() => setName(pgenre.name)}
                            >
                                &times;
                            </button>
                        </div>

                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateName(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setName(pgenre.name)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdatePG;