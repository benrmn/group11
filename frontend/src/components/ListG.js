// Dean and Ben worked on this file
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ShowPosts from "./ShowPosts";
import UpdateG from "./UpdateG";

/*
This page allows the users to see the list of
genres they can browse and lets admins
add or remove them
*/

const ListG = () => {
    const [genres, setGenres] = useState([]);

    // delete genre function
    // if the genre is deleted, the posts in the genre are also
    // deleted and so are all the comments on each of the posts
    const deleteGenre = async id => {
        try {
            const deleteGenre = await fetch(`http://localhost:5000/genre/${id}`, {
                method: "DELETE"
            });

            setGenres(genres.filter(genre => genre.Genre_ID !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    // get list of genres from database
    const getGenre = async () => {
        try {
            const response = await fetch("http://localhost:5000/genre");
            const jsonData = await response.json();

            setGenres(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getGenre();
    }, []);

    console.log(genres);
    const user = JSON.parse(localStorage.getItem("userinfo"))

    // display a different page based on if the user is an admin or not
    if (user.isAdmin) {
    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map(genre => (
                        <tr key={genre.Genre_ID}>
                            <td><Link to={`/genre_posts/${genre.Genre_ID}`} element={<ShowPosts />}>{genre.Genre_Name}</Link></td>
                            <td>
                                <UpdateG genre={genre} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteGenre(genre.Genre_ID)}>
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
        return (
            <Fragment>
                {" "}
                <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map(genre => (
                            <tr key={genre.Genre_ID}>
                                <td><Link to={`/genre_posts/${genre.Genre_ID}`} element={<ShowPosts />}>{genre.Genre_Name}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
};

export default ListG;