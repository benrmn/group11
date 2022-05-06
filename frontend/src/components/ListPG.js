// Ben worked on this file
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShowPosts from "./ShowPosts";

import UpdatePG from "./UpdatePG";

const ListPG = () => {
    const [pgenres, setPGenres] = useState([]);

    // pass a specific private genre_id to delete from db
    const deletePGenre = async id => {
        try {
            const deletePGenre = await fetch(`http://localhost:5000/priv_genre/${id}`, {
                method: "DELETE"
            });

            // we want to filter out any private genre that does not have the id that has been deleted for rerender
            setPGenres(pgenres.filter(pgenre => pgenre.Genre_ID !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    // get all private genres to list
    const getPGenre = async () => {
        try {
            const response = await fetch("http://localhost:5000/priv_genre");
            const jsonData = await response.json();

            // set our list of pgenres
            setPGenres(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getPGenre();
    }, []);

    console.log(pgenres);

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Title pgenres</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {pgenres.map(pgenre => (
                        <tr key={pgenre.Genre_ID}>
                            <td>
                                <Link to={`/genre_posts/${pgenre.Genre_ID}`} element={<ShowPosts />}>{pgenre.Genre_Name}</Link>
                            </td>
                            <td>
                                <UpdatePG pgenre={pgenre} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deletePGenre(pgenre.Genre_ID)}>
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

export default ListPG;