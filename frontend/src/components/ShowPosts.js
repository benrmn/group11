//Kiara Berry coded this file

import React, { Component, Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, renderMatches } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ListC from './ListC'
import UpdatePost from "./UpdatePost";


function ShowPosts() {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("userinfo"));

    const { id } = useParams();
    const getPosts = async() => {
        try {
            const response = await fetch(`http://localhost:5000/genre_posts/${id}`);
            const jsonData = await response.json(); //parse data
            setPosts(jsonData); //changing state
        } catch(err) {
            console.error(err.message)
        }
    }
    const deletePost = async (id) => {
        try {
            const deletePost = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "DELETE"

            });
            //only display posts that fit filter condition
            setPosts(posts.filter(Post => Post.Post_ID !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

    const likePost = async (genre_id, post_id) => {
        try {
            const response = await fetch(`http://localhost:5000/like/${post_id}`, {
                method: "PUT"
            });
            window.location = `/genre_posts/${genre_id}`;
        } catch (err) {
            console.error(err.message)
        }
    }

    const unlikePost = async (genre_id, post_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dislike/${post_id}`, {
                method: "PUT"
            });
            window.location = `/genre_posts/${genre_id}`;
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getPosts();
    }, []); //ensure we only make one request
    // console.log(posts)

    if (user.isAdmin) {
    return (
        <Fragment>
            <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>Posts</th>
                        <th>Author</th>
                        <th>Num Likes</th>
                        <th>Like / Dislike</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(Post => (
                        <tr key={Post.Post_ID}>
                            <td><Link to={`/comment/${Post.Post_ID}`} element={<ListC />}>{Post.Post_Text}</Link></td>
                            <td>{Post.Username}</td>
                            <td>{Post.Num_likes}</td>
                            <td>
                                <button onClick={() => likePost(Post.Genre_ID, Post.Post_ID)}>Like</button>
                                <button onClick={() => unlikePost(Post.Genre_ID, Post.Post_ID)}>dislike</button>
                            </td>
                            <td>
                                <UpdatePost Post={Post} x={true} />
                                <button onClick={() => deletePost(Post.Post_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Fragment>

        );
    } else {
        return (
            <Fragment>
                <table class="table mt-5 text-center" style={{ color: "#ffffff" }}>
                    <thead>
                        <tr>
                            <th>Posts</th>
                            <th>Author</th>
                            <th>Num Likes</th>
                            <th>Like / Dislike</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(Post => (
                        <tr key={Post.Post_ID}>
                            <td><Link to={`/comment/${Post.Post_ID}`} element={<ListC />}>{Post.Post_Text}</Link></td>
                            <td>{Post.Username}</td>
                            <td>{Post.Num_likes}</td>
                            <td>
                                <button onClick={() => likePost(Post.Genre_ID, Post.Post_ID)}>Like</button>
                                <button onClick={() => unlikePost(Post.Genre_ID, Post.Post_ID)}>dislike</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </Fragment>

        );
    }


}

export default ShowPosts;