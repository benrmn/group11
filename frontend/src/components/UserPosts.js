//Kiara Berry coded this file
//user can view "my posts" on home page

import React, { Component, Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, renderMatches } from 'react-router-dom';
import { useParams } from "react-router-dom";
import UpdatePost from "./UpdatePost";

function UserPosts () {
    
    const [posts, setPosts] = useState([]);

    //delete function for post
    const deletePost = async(id) => {
        try {
            const deletePost = await fetch(`http://localhost:5000/posts/${id}`,
                {
                    method: "DELETE"
                }); 
        //only display posts that fit filter condition
        setPosts(posts.filter(Post => Post.Post_ID !== id))
        }catch(err) {
            console.error(err.message)
        }
    }

    const getPosts = async () => {
        const user = JSON.parse(localStorage.getItem("userinfo"))
        try {

            const response = await fetch(`http://localhost:5000/posts/${user.User_ID}`);
            const jsonData = await response.json(); //parse data

            setPosts(jsonData); //changing state
            console.log(jsonData);
        } catch(err) {
            console.error(err.message)
        }
    }


    useEffect(() => {
        getPosts();
    }, []); //ensure we only make one request
    // console.log(posts)

    return (
        <Fragment>
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Posts</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(Post => (
                        <tr>
                            <td>{Post.Post_Text}</td>
                            <td>
                                <UpdatePost Post={Post} x={false} />
                                <button onClick={() => deletePost(Post.Post_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Fragment>

    );
}


export default UserPosts;