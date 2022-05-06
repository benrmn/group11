// Ben worked on this file
import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

const UpdatePG = ({ pgenre }) => {
    const [name, setName] = useState(pgenre.Genre_Name);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // pass a specific id to update a topic
    const updateName = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch(
                `http://localhost:5000/priv_genre/${pgenre.Genre_ID}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            window.location = "/priv_genre";
        } catch (err) {
            console.error(err.message);
        }
    };

    // modal (pop out) to enter a new text/edit the existing topic
    return (
        <Fragment>
            <>
                <Button variant="primary" onClick={handleShow} data-bs-target={`#id${pgenre.Genre_ID}`}>
                    Edit
                </Button>
                <Modal show={show} id={`id${pgenre.Genre_ID}`} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit PG Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => updateName(e)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Fragment>
    );
};

export default UpdatePG;