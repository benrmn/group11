// Dean worked on this file
import React, { Fragment } from "react";
import {useNavigate } from 'react-router-dom';
import UpdateUser from "./UpdateUser";

/*
This page shows the user fields
which they are allowed to edit
*/

const User = () => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const navigate = useNavigate();

    //delete user given an id
    const deleteUser = async id => {
        try {
            const deleteUser = await fetch(`http://localhost:5000/user/${id}`, {
                method: "DELETE"
            });
            
            // log out the user and return them to the home page
            localStorage.removeItem("userinfo");
            navigate("/");

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        // show the user fields they can edit
        <Fragment>
            {" "}
            <table class="table mt-5 text-center" style={{color:"#ffffff"}}>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody >
                    
                        <tr>
                            <td>First Name: {user.User_Fname}</td>
                            <td>
                                <UpdateUser user={user} field = "User_Fname" current= {user.User_Fname} />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name: {user.User_Lname}</td>
                            <td>
                                <UpdateUser user={user} field = "User_Lname" current={user.User_Lname} />
                            </td>
                        </tr>
                        <tr>
                            <td>User Name: {user.Username}</td>
                            <td>
                                <UpdateUser user={user} field = "Username" current={user.Username} />
                            </td>
                        </tr>
                </tbody>
            </table>
            <button type="button" className="btn btn-primary" onClick={function() { localStorage.removeItem("userinfo");navigate("/")}}>Logout</button><br></br>
            <button type="button" className="btn btn-primary" onClick={function() { deleteUser(user.User_ID)}}>Delete Account</button>
        </Fragment>
        
    );
};

export default User;