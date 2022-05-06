//Ben and Dean worked on this file
import React, { Fragment, useEffect, useState } from "react";

/*
This page shows the list of
most liked posts that are in
public topics
*/

const Leaderboard = () => {
    const [leads, setLeaderboard] = useState([]);

    // query the database for list of topics in public genres
    // ordered by the number of likes
    const getLeaderboard = async () => {
        try {
            const response = await fetch("http://localhost:5000/leaderboard");
            const jsonData = await response.json();

            setLeaderboard(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getLeaderboard();
    }, []);


    return (
        // display page that shows the post title, creator, and number of likes
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Post title</th>
                        <th>Username</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(Leads => (
                        <tr>
                            <td>
                                {Leads.Post_Text}
                            </td>
                            <td>
                                {Leads.Username}
                            </td>
                            <td>
                                {Leads.Num_likes}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Leaderboard;