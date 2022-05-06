//Dean worked on this file
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

/*
This page shows the list of admins
and allows admins to add and remove
other admin users
*/


const Admin = () => {
    const [users, setUsers] = useState([]);
    const [usersb, setUsersb] = useState([]);
    const navigate = useNavigate();

    // get list of users that are not admins 
    const getUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/unadmin`);
            const jsonData = await response.json();
            console.log(jsonData)
            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // get list of users that are admins
    const getUsersb = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin`);
            const jsonData = await response.json();

            setUsersb(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // set a user as an admin
    const adminUser = async id => {
        try {
            const adminUsr = await fetch(`http://localhost:5000/admin/${id}`, {
                method: "PUT"
            });
            window.location = "/admins";
        } catch (err) {
            console.error(err.message);
        }
    };

    // set a user as not an admin
    const unadminUser = async id => {
        try {
            const unadminUsr = await fetch(`http://localhost:5000/unadmin/${id}`, {
                method: "PUT"
            });
            window.location = "/admins";
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
        getUsersb();
    }, []);

    return (
        // display the html page that lists all users and allows to admin
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Admin Users</th>
                        <th>Unadmin</th>
                    </tr>
                </thead>
                <tbody>
                    {usersb.map(user => (
                        <tr>
                            <td>
                                {user.Username}
                            </td>
                            <td><button onClick={function () { unadminUser(user.Username); navigate("/admins") }}>unadmin</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr>
                            <td>
                                {user.Username}
                            </td>
                            <td><button onClick={function () { adminUser(user.Username); navigate("/admins") }}>admin</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Admin;