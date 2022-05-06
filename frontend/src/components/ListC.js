// Jay and Ben worked on this file
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import UpdateC from "./UpdateC";

/*
This page is to list the comments
on a specified post. It also allows an admin to
edit or delete a comment straight from the post page to
make moderation easier.
*/

const ListC = () => {
    const [comments, setComment] = useState([]);
    const { id } = useParams();

    //delete comment function
    const deleteComment = async id => {
        try {
            const deleteComment = await fetch(`http://localhost:5000/comment/${id}`, {
                method: "DELETE"
            });
            
            // this refreshes the comment list on the page based on what was deleted
            setComment(comments.filter(comment => comment.Comment_ID !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    // this gets the list of comments from the databse
    const getComment = async () => {
        try {
            const response = await fetch(`http://localhost:5000/comment/${id}`);
            const jsonData = await response.json();

            setComment(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getComment();
    }, []);

    //console.log(comments);
    const user = JSON.parse(localStorage.getItem("userinfo"))

    // Allow admins to edit and delete, but only let users view
    if (user.isAdmin) {
    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Author</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.Comment_ID}>
                            <td>{comment.Comment_Text}</td>
                            <td>{comment.Username}</td>
                            <td>
                                <UpdateC comment={comment} x={true} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteComment(comment.Comment_ID)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
    } else {
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.Comment_ID}>
                            <td>{comment.Comment_Text}</td>
                            <td>{comment.Username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    }
};

export default ListC;