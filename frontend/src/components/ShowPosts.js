//Kiara Berry coded this file

import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, renderMatches } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ListC from './ListC'
import UpdatePost from "./UpdatePost";



function ShowPosts() {
    const [posts, setPosts] = useState([]);
    const [totLikes, setTotLikes] = useState('0');

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
            return jsonData.count
        } catch (err) {
            console.error(err.message);
        }
    };

    function glikes(post_id) {
        var x = getLikes(post_id);
        var y = 0;
        y = Promise.all([x]).then((results) => {
            //console.log(results[0]);
            return results[0];
        });
        console.log(y);
        //return y;
    };

    useEffect(() => {
        getPosts();
    }, []); //ensure we only make one request
    // console.log(posts)


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
                            <p>likes: {glikes(Post.Post_ID)}</p>
                            {/* <button onClick={() => likePost(Post.Post_ID)}>Like</button>  */}
                            <UpdatePost Post={Post} />
                            <button onClick={() => deletePost(Post.Post_ID)}>Delete</button> 
                        </>
                    ))}
                </div>
            </div>
        </div>

    );
}



export default ShowPosts;