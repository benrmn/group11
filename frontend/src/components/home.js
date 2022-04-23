import React from 'react';
import {useNavigate } from 'react-router-dom';
import Post from './post';



function Home() {

    const navigate = useNavigate();

    return (
        <>
            <p>
            "hi yeti"
            </p>
        </>

    );
}

export default Home;