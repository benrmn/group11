//Dean and Ben coded this file

import React, { Component, Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, renderMatches } from 'react-router-dom';
import { useParams } from "react-router-dom";
import UpdateC from "./UpdateC";

function UserComments() {

    const [comments, setComment] = useState([]);

    //delete function for post
    const deleteComment = async (id) => {
        try {
            const deleteComment = await fetch(`http://localhost:5000/comment/${id}`,
                {
                    method: "DELETE"
                });
            //only display posts that fit filter condition
            setComment(comments.filter(Comment => Comment.Comment_ID !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

    const getComment = async () => {
        const user = JSON.parse(localStorage.getItem("userinfo"));
        try {

            const response = await fetch(`http://localhost:5000/user_comment/${user.User_ID}`);
            const jsonData = await response.json(); //parse data

            setComment(jsonData); //changing state
            //console.log(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }


    useEffect(() => {
        getComment();
    }, []); //ensure we only make one request
    // console.log(posts)

    return (
        <Fragment>
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(Comment => (
                        <tr>
                            <td>{Comment.Comment_Text}</td>
                            <td>
                                <UpdateC comment={Comment} x={false} />
                                <button onClick={() => deleteComment(Comment.Comment_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Fragment>
    );
}


export default UserComments;