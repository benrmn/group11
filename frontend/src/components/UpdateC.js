import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

const UpdateC = ({ comment, x }) => {
    //console.log(comment);
    const [text, setText] = useState(comment.Comment_Text);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit description function

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
            //console.log(x);
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