import React from 'react';
import {useNavigate } from 'react-router-dom';
import ListA from './ListA';
import Post from './post';



function Home() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userinfo"))

    if ("userinfo" in localStorage){
        if (user.isAdmin == true) {
        return (
            <>

                Hello, {user.User_Fname}
                <br></br>
                <button type="button" className="btn btn-primary" onClick={function() { localStorage.removeItem("userinfo");navigate("/")}}>Logout</button>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/user_posts")}>My posts</button>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/user_comments")}>My comments</button>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/bans")}>Blacklist</button>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/user")}>Account Settings</button>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/genre")}>Genre's</button>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/priv_genre")}>Private Genre's</button>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/lleaderboard")}>Leaderboard</button>

            </>

        );
        } else {
            return (
                <>
                    Hello, {user.User_Fname}
                    <br></br>
                    <button type="button" className="btn btn-primary" onClick={function () { localStorage.removeItem("userinfo"); navigate("/") }}>Logout</button>
                    <br></br>
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/user_posts")}>My posts</button>
                    <br></br>
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/user_comments")}>My comments</button>
                    <br></br>
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/user")}>Account Settings</button>
                    <br></br>
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/genre")}>Genre's</button>
                    <br></br>
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/lleaderboard")}>Leaderboard</button>
                </>
            );
        }
    } else {
        return (
            <>

                Hello, Please Log In
                {/* <button type="button" className="btn btn-primary" onClick={() => navigate("/user_posts/:id")}>My posts</button>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/genre")}>Genre's</button>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/priv_genre")}>Private Genre's</button> */}

            </>

        );
    }
}

export default Home;