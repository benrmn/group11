import React from 'react';
import {useNavigate } from 'react-router-dom';
import Post from './post';



function Home() {

    const navigate = useNavigate();

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/post")}>Create Post</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/genre")}>Genre's</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/priv_genre")}>Private Genre's</button>
        </>

    );
}

export default Home;