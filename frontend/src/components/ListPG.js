import React, { Fragment, useEffect, useState } from "react";

import UpdatePG from "./UpdatePG";

const ListPG = () => {
    const [pgenres, setPGenres] = useState([]);

    //delete pgenre function

    const deletePGenre = async id => {
        try {
            const deletePGenre = await fetch(`http://localhost:5000/priv_genre/${id}`, {
                method: "DELETE"
            });

            setPGenres(pgenres.filter(pgenre => pgenre.Genre_ID !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getPGenre = async () => {
        try {
            const response = await fetch("http://localhost:5000/priv_genre");
            const jsonData = await response.json();

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
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {pgenres.map(pgenre => (
                        <tr key={pgenre.Genre_ID}>
                            <td>{pgenre.Genre_Name}</td>
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