//Kiara Berry coded this file

import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

const UpdateA = ({ Announcement }) => {

    const [announcements, setAnnouncement] = useState(Announcement.Announcement_Text)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit post text function
    const updateAnnouncement = async(e) => {
        //don't want to refresh yet
        e.preventDefault();
        try {
            //send request
            const body = { announcements };
            const response = await fetch (`http://localhost:5000/announcement/${Announcement.Announcement_ID}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            } );
            //refresh screen to see new change
            window.location = `/`;
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <>
                <Button variant="primary" onClick={handleShow} data-bs-target={`#id${Announcement.Announcement_ID}`}>
                    Edit
                </Button>
                <Modal show={show} id={`id${Announcement.Announcement_ID}`} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><input type="text" className="form-control" value={announcements} onChange={e => setAnnouncement(e.target.value)} /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => updateAnnouncement(e)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Fragment>
    );
};

export default UpdateA;