import React from 'react';
import {useNavigate } from 'react-router-dom';
import ListA from './ListA';
import Post from './post';



function Home() {

    const navigate = useNavigate();

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/user_posts/:id")}>My posts</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/genre")}>Genre's</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/priv_genre")}>Private Genre's</button>
        </>

    );
}

export default Home;