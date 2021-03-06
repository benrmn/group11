//Kiara Berry coded this file
//ShowPosts and UserPosts go here when editing a post

import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

const UpdatePost = ({ Post, x }) => {

    const [post_text, setPost_Text] = useState(Post.Post_Text)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit post text function
    const updatePost_Text = async(e) => {
        //don't want to refresh yet
        e.preventDefault();
        try {
            //send request
            const body = { post_text };
            const response = await fetch (`http://localhost:5000/posts/${Post.Post_ID}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            } );
            //refresh screen to see new change
            window.location = `/genre_posts/${Post.Genre_ID}`;
            if (x === true) {
                window.location = `/genre_posts/${Post.Genre_ID}`;
            } else {
                window.location = `/user_posts`;
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        //text box popup for editing a post and saving changes 
        <Fragment>
            <>
                <Button variant="primary" onClick={handleShow} data-bs-target={`#id${Post.Post_ID}`}>
                    Edit
                </Button>
                <Modal show={show} id={`id${Post.Post_ID}`} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><input type="text" className="form-control" value={post_text} onChange={e => setPost_Text(e.target.value)} /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => updatePost_Text(e)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Fragment>
    );
};

export default UpdatePost;