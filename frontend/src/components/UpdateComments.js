import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

const UpdateComments = ({ comment }) => {
    const [name, setName] = useState(comment.Comment_Text);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit description function

    const updateComment = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch(
                `http://localhost:5000/comment/${comment.Post_ID}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            window.location = "/comment";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <>
                <Button variant="primary" onClick={handleShow} data-bs-target={`#id${comment.Post_ID}`}>
                    Edit
                </Button>
                <Modal show={show} id={`id${comment.Post_ID}`} onHide={handleClose}>
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

export default UpdateComments;