//Kiara Berry coded this file

import React, { Fragment, useState } from 'react';

import { useParams } from "react-router-dom";


function Announcement() {
    const [text, setPost] = useState("");
    const { id } = useParams();

    //function after clicking submit button for announcement
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {text};
            //fetch is automatically get so need to clarify it is for 'post'
            const response = await fetch(`http://localhost:5000/announcement`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)});

            //redirect to home page after submitting announcement
            window.location = `/`;
        } catch(err) {
            console.error(err.message);
        }
    }
    return (  
        // text form for announcement 
        <>
            <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-lg">Body</span>
            <textarea className="form-control" aria-label="With textarea" value={text} onChange={e => setPost(e.target.value)}></textarea>
            </div>
            
            <button type="button" classNameName="btn btn-primary" onClick={onSubmitForm}>Post</button>
        </>


    );
}

export default Announcement;