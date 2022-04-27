
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
    console.log(posts)

    return (
        <Fragment>

            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Post Title</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.Post_ID}>
                            <td>{post.Post_Text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
        // <div class="container">
        //     <div class="row">
        //     <span class="border border-2"></span>
        //         <div class="col"
        //         >
        //             "info 1"
        //         </div>
        //     <span class="border border-2"></span>
        //     </div>
        //     <div class="row">
        //         <div class="col">
        //             "info 2"
        //         </div>
        //     <span class="border border-2"></span>
        //     </div>
        // </div>

    );
}



export default ShowPosts;