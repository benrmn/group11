import React, { Fragment, useEffect, useState } from "react";

import UpdateG from "./UpdateG";

const ListG = () => {
    const [genres, setGenres] = useState([]);

    //delete genre function

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
                    {genres.map(genre => (
                        <tr key={genre.Genre_ID}>
                            <td>{genre.Genre_Name}</td>
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
};

export default ListG;