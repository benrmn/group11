// Dean worked on this file
import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

/*
This page is to produce a pop up window
to allow a user to edit their comment text
or to allow an admin to edit someones comment text
*/

const UpdateC = ({ comment, x }) => {
    //console.log(comment);
    const [text, setText] = useState(comment.Comment_Text);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit comment text function
    const updateText = async e => {
        e.preventDefault();
        try {
            const body = { text };
            const response = await fetch(
                `http://localhost:5000/comment/${comment.Comment_ID}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            // comments can be edited in 2 places, so we have a boolean value we use
            // to ensure that the user is redirected to the same page theyre already on
            if (x === true) {
                window.location = `/comment/${comment.Post_ID}`;
            } else {
                window.location = `/user_comments`;
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        // display edit pop up window
        <Fragment>
            <>
                <Button variant="primary" onClick={handleShow} data-bs-target={`#id${comment.Comment_ID}`}>
                    Edit
                </Button>
                <Modal show={show} id={`id${comment.Comment_ID}`} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Text</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><input type="text" className="form-control" value={text} onChange={e => setText(e.target.value)} /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => updateText(e)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Fragment>
    );
};

export default UpdateC;