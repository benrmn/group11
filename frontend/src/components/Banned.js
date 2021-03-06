//Jay, Dean, and Ben worked on this file
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

/*
This page shows the list of banned users
and allows admins to ban or
unban other users
*/

const Banned = () => {
    const [users, setUsers] = useState([]);
    const [usersb, setUsersb] = useState([]);
    const navigate = useNavigate();

    // get list of users that are not banned 
    const getUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/unblacklist`);
            const jsonData = await response.json();

            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // get list of users that are banned 
    const getUsersb = async () => {
        try {
            const response = await fetch(`http://localhost:5000/blacklist`);
            const jsonData = await response.json();

            setUsersb(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // set a user as banned
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

    // set a user as not banned
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
        // display html page that shows the banned users
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