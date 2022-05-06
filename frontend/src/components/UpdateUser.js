// Dean worked on this file
import React, { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

/*
This is the page that allows users to
edit all of their user information
by providing a popup
*/

const UpdateUser = ({ user, field, current }) => {
    

    const [name, setName] = useState(current);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit description function

    if (!user){
        return('');
    }

    // depending on the field this query lets the user edit a variety of attributes
    // if the attribute is changed the current users logged in information
    // is changed on local storage as well.
    const updateName = async e => {
        e.preventDefault();
        try {
            const body = { name, field };
            const response = await fetch(
                `http://localhost:5000/user/${user.User_ID}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            
            // depending on the field changes the users info
            // thats on local storage
            if(field==="User_Fname"){
                user.User_Fname = name
            }
            if(field==="User_Lname"){
                user.User_Lname = name
            }   
            if(field==="Username"){
                user.Username = name
            }  
            localStorage.setItem("userinfo",JSON.stringify(user))

            window.location = "/user";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        // pop up window that shows the user what they are
        // currently editing
        <Fragment>
            <>
                <Button variant="primary" onClick={handleShow} data-bs-target={`#id${user.User_ID}`}>
                    Edit
                </Button>
                <Modal show={show} id={`id${user.User_ID}`} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {field}</Modal.Title>
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

export default UpdateUser;