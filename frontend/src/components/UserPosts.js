//Kiara Berry coded this file

import React, {useEffect, useState} from "react";

import UpdatePost from "./UpdatePost";

function UserPosts () {
    
    const [posts, setPosts] = useState([]);

    //delete function for post
    const deletePost = async(id) => {
        try {
            const deletePost = await fetch(`http://localhost:5000/posts/${id}`, {method: "DELETE"
            
        }); 
        //only display posts that fit filter condition
        setPosts(posts.filter(Post => Post.Post_ID !== id))
        }catch(err) {
            console.error(err.message)
        }
    }

    const getPosts = async() => {
        try {

            const response = await fetch("http://localhost:5000/posts?id=1");
            const jsonData = await response.json(); //parse data

            console.log(localStorage().getItem("userinfo"));

            setPosts(jsonData); //changing state
            console.log(jsonData)
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
                            <h1 key={Post.User_ID}>{Post.Post_Text} </h1>
                            <UpdatePost Post = {Post} />
                            <button onClick={() => deletePost(Post.Post_ID)}>Delete</button> 

                        </>
                    ))}
                </div>
            </div>
        </div>

    );
}


export default UserPosts;