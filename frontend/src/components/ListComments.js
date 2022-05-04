import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ShowPosts from "./ShowPosts";

import UpdateComments from "./UpdateComments";

const ListComments = () => {
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    //delete comment function

    const deleteComment = async id => {
        try {
            const deleteComment = await fetch(`http://localhost:5000/comment/${id}`, {
                method: "DELETE"
            });

            setComments(comments.filter(comment => comment.Post_ID !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getComment = async () => {
        try {
            const response = await fetch("http://localhost:5000/comment");
            const jsonData = await response.json();

            setComments(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getComment();
    }, []);

    console.log(comments);

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.Comment_ID}>
                            <td>{comment.Comment_Text}</td>
                            <td>
                                <UpdateComments comment={comment} />
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
};

export default ListComments;