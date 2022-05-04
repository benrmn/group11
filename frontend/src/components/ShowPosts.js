//Kiara Berry coded this file

import React, { Component, Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, renderMatches } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ListC from './ListC'
import UpdatePost from "./UpdatePost";


function ShowPosts() {
    const [posts, setPosts] = useState([]);
    const totLikes = 0;
    const user = JSON.parse(localStorage.getItem("userinfo"));

    function setStateAsync(totLikes) {
        return new Promise((resolve) => {
            this.setState(totLikes, resolve)
        });
    }

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

    const getLikes = async (post_id) => {
        try {
            const response = await fetch(`http://localhost:5000/like/${post_id}`);
            const jsonData = await response.json();
            //console.log(jsonData.count);
            await this.setStateAsync({ totLikes: jsonData.count });
        } catch (err) {
            console.error(err.message);
        }
    };

    function glikes(post_id) {
        var x = getLikes(post_id);
        var y = 0;
        y = Promise.all([x]).then((results) => {
            console.log(results[0]);
            return results[0];
        });
        console.log(y);
        //return y;
    };

    const likePost = async (genre_id, post_id) => {
        try {
            const response = await fetch(`http://localhost:5000/like/${post_id}/${user.User_ID}`, {
                method: "POST"
            });
            console.log(user.User_ID);
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
        <div className="container">
            <div className="row">
            {/* <span className="border border-2"></span> */}
                <div className="col">
                    {posts.map(Post =>  (
                        <>
                            <hr></hr>
                            <h1 key={Post.Post_ID}>
                                <Link to={`/comment/${Post.Post_ID}`} element={<ListC />}>{Post.Post_Text}</Link></h1>
                            {/* <p>likes: {getLikes(Post.Post_ID)}</p> */}
                            <button onClick={() => likePost(Post.Genre_ID, Post.Post_ID)}>Like</button> 
                            <UpdatePost Post={Post} />
                            <button onClick={() => deletePost(Post.Post_ID)}>Delete</button> 
                        </>
                    ))}
                </div>
            </div>
        </div>

        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    {/* <span className="border border-2"></span> */}
                    <div className="col">
                        {posts.map(Post => (
                            <>
                                <hr></hr>
                                <h1 key={Post.Post_ID}>
                                    <Link to={`/comment/${Post.Post_ID}`} element={<ListC />}>{Post.Post_Text}</Link></h1>
                                {/* <p>likes: {getLikes(Post.Post_ID)}</p> */}
                                <button onClick={() => likePost(Post.Genre_ID, Post.Post_ID)}>Like</button>
                            </>
                        ))}
                    </div>
                </div>
            </div>

        );
    }


}

export default ShowPosts;