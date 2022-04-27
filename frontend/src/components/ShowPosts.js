
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowPosts() {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const getPosts = async() => {
        try {
            // the fetch will need to be (`http://localhost:5000/genre_posts/${genre.Genre_ID}`); once we have its own page setup
            // i still need to find a way to give a genre id its own page
            const response = await fetch(`http://localhost:5000/genre_posts/${id}`);
            const jsonData = await response.json(); //parse data

            setPosts(jsonData); //changing state
        } catch(err) {
            console.error(err.message)
        }
    }


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
                            <h1 key={Post.Post_ID}>{Post.Post_Text} </h1>
                        </>
                    ))}
                </div>
            </div>
        </div>

    );
}



export default ShowPosts;