
import React, {useEffect, useState} from "react";

function ShowPosts () {
    
    const [posts, setPosts] = useState([]);

    const getPosts = async() => {
        try {

            const response = await fetch("http://localhost:5000/posts");
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
        <div class="container">
            <div class="row">
            <span class="border border-2"></span>
                <div class="col"
                >
                    "info 1"
                </div>
            <span class="border border-2"></span>
            </div>
            <div class="row">
                <div class="col">
                    "info 2"
                </div>
            <span class="border border-2"></span>
            </div>
        </div>

    );
}



export default ShowPosts;