import React, { Fragment } from 'react';
import {useNavigate } from 'react-router-dom';
import Post from './post';



const Home = () => {

    const navigate = useNavigate();

    return (
        <Fragment>            
            <button type="button" className="btn btn-primary" onClick={() => navigate("/show_posts")}>My posts</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/genre")}>Genre's</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/priv_genre")}>Private Genre's</button>
        </Fragment>
    );
}

export default Home;