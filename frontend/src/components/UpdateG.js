// Dean worked on this file
import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

/*
This page is to produce a pop up window
to allow an admin to edit a genres name
*/

const UpdateG = ({ genre }) => {
    const [name, setName] = useState(genre.Genre_Name);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit genre name function
    const updateName = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch(
                `http://localhost:5000/genre/${genre.Genre_ID}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            // reroute the user to the genre page so the updates load
            window.location = "/genre";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        // show drop down that lets the user change the genre name
        <Fragment>
            <>
                <Button variant="primary" onClick={handleShow} data-bs-target={`#id${genre.Genre_ID}`}>
                    Edit
                </Button>
                <Modal show={show} id={`id${genre.Genre_ID}`} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Title</Modal.Title>
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

export default UpdateG;