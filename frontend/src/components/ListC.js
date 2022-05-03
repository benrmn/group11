import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

import UpdateC from "./UpdateC";

const ListC = () => {
    const [comments, setComment] = useState([]);
    const { id } = useParams();
    //delete genre function

    const deleteComment = async id => {
        try {
            const deleteComment = await fetch(`http://localhost:5000/comment/${id}`, {
                method: "DELETE"
            });

            setComment(comments.filter(comment => comment.Comment_ID !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

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

    console.log(comments);

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.Comment_ID}>
                            <td>{comment.Comment_Text}</td>
                            <td>
                                <UpdateC comment={comment} />
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

export default ListC;