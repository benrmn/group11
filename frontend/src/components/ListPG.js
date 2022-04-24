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

            setPGenres(pgenres.filter(pgenres => pgenres.pgenres_id !== id));
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
            <table>
                <thead>
                    <tr>
                        <th>Private Genre Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { }
                    {pgenres.map(pgenre => (
                        <tr key={pgenre.pgenre_id}>
                            <td>{pgenre.name}</td>
                            <td>
                                <UpdatePG pgenre={pgenre} />
                            </td>
                            <td>
                                <button
                                    onClick={() => deletePGenre(pgenre.pgenre_id)}
                                >
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