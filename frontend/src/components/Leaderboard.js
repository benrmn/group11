//Ben and Dean worked on this file
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Leaderboard = () => {
    const [leads, setLeaderboard] = useState([]);

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