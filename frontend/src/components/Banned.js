//Jay, Dean, and Ben worked on this file
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Banned = () => {
    const [users, setUsers] = useState([]);
    const [usersb, setUsersb] = useState([]);
    const navigate = useNavigate();


    const getUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/unblacklist`);
            const jsonData = await response.json();

            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUsersb = async () => {
        try {
            const response = await fetch(`http://localhost:5000/blacklist`);
            const jsonData = await response.json();

            setUsersb(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const banUser = async id => {
        try {
            const banUsr = await fetch(`http://localhost:5000/blacklist/${id}`, {
                method: "PUT"
            });
            window.location = "/bans";
        } catch (err) {
            console.error(err.message);
        }
    };

    const unbanUser = async id => {
        try {
            const unbanUsr = await fetch(`http://localhost:5000/unblacklist/${id}`, {
                method: "PUT"
            });
            window.location = "/bans";
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
        getUsersb();
    }, []);

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Banned Users</th>
                        <th>Unban</th>
                    </tr>
                </thead>
                <tbody>
                    {usersb.map(user => (
                        <tr>
                            <td>
                                {user.Username}
                            </td>
                            <td><button onClick={function () { unbanUser(user.Username); navigate("/bans") }}>unban</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Ban</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr>
                            <td>
                                {user.Username}
                            </td>
                            <td><button onClick={function () { banUser(user.Username); navigate("/bans") }}>ban</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Banned;