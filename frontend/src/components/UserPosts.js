import React, {useEffect, useState} from "react";

function UserPosts () {
    
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
                        </>
                    ))}
                </div>
            </div>
        </div>

    );
}


export default UserPosts;