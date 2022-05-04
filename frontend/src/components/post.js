//Kiara Berry coded this file

import React, { useState } from 'react';
import { useParams } from "react-router-dom";


function Post() {
    const [post_text, setPost] = useState("");
    const { id } = useParams();

    //function after clicking submit button for post
    const onSubmitForm = async(e) => {
        const user = JSON.parse(localStorage.getItem("userinfo"))

        e.preventDefault();
        try {
            const body = {post_text};
            //fetch is automatically get so need to clarify it is for 'post'
            const response = await fetch(`http://localhost:5000/posts/${id}/${user.User_ID}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)});

            window.location = `/genre_posts/${id}`;
        } catch(err) {
            console.error(err.message);
        }
    }
    return (  
        <>
            <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
                {/* ayo wtf is this for theres no title lmao */}
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
            </div>

            <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-lg">Body</span>
            <textarea className="form-control" aria-label="With textarea" value={post_text} onChange={e => setPost(e.target.value)}></textarea>
            </div>
            
            <button type="button" classNameName="btn btn-primary" onClick={onSubmitForm}>Post</button>
        </>


    );
}

export default Post;