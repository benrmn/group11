// import React from 'react';
// import {useNavigate } from 'react-router-dom';

// function ShowUser() {

//     const updateName = async e => {
//         e.preventDefault();
//         try {
//             const body = { name };
//             const response = await fetch(
//                 `http://localhost:5000/user/${user.User_ID}`,
//                 {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(body)
//                 }
//             );

//             window.location = "/user";
//         } catch (err) {
//             console.error(err.message);
//         }
//     };


//     const navigate = useNavigate();
//     const user = JSON.parse(localStorage.getItem("userinfo"))

//     if ("userinfo" in localStorage){
//         return (
//             <>

//                 First Name: {user.User_Fname} <br></br>
//                 Last Name: {user.User_Lname} <br></br>
//                 Username: {user.Username} <br></br>
//                 Admin: {user.isAdmin.toString()} <br></br>
//                 Banned: {user.isBanned.toString()} <br></br>
//                 <button type="button" className="btn btn-primary" onClick={function() { navigate("/UpdateUser")}}>Edit</button>
//                 <button type="button" className="btn btn-primary" onClick={function() { localStorage.removeItem("userinfo");navigate("/")}}>Logout</button>

//             </>

//         );
//     } else {
//         return (
//             navigate('/login')

//         );
//     }
// }

// export default ShowUser;

import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

import ShowPosts from "./ShowPosts";

import UpdateUser from "./UpdateUser";



const User = () => {
    const user = JSON.parse(localStorage.getItem("userinfo"))
    const navigate = useNavigate();

    //delete genre function

    const deleteUser = async id => {
        try {
            const deleteUser = await fetch(`http://localhost:5000/user/${id}`, {
                method: "DELETE"
            });
            
            localStorage.removeItem("userinfo");
            navigate("/");

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
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