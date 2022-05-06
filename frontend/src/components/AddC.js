// Jay worked on this file
import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

/*
This page allows a user to comment on a post given a post id
*/

const AddC = () => {
    const [text, setText] = useState("");
    const [post, setPost] = useState("");

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("userinfo"));
    var Username = user.Username;

    // this function creates a new comment in the databse
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { text, Username };
            const response = await fetch(`http://localhost:5000/comment/${id}/${user.User_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            // refresh the page so the changes load
            window.location = `/comment/${id}`;
        } catch (err) {
            console.error(err.message);
        }
    };

    // this comment gets this post the comment is on
    const getPost = async () => {
        try {
            const response = await fetch(`http://localhost:5000/comment_post/${id}`);
            const jsonData = await response.json();
            // set the post text to the top of the page
            setPost(jsonData.rows[0].Post_Text);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <Fragment>
            <h1>{post}</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={text} onChange={e => setText(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default AddC;