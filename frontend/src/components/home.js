import React from 'react';
import {useNavigate } from 'react-router-dom';
import Post from './post';



function Home() {

    const navigate = useNavigate();

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/post")}>Create Post</button>
        </>

    );
}

export default Home;