//Kiara Berry coded this file

import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ListC from './ListC'
import UpdatePost from "./UpdatePost";



function ListA() {
    const [announcements, setAnnouncements] = useState([]);
    //const { id } = useParams();
    //console.log(id);
    const getAnnouncements = async() => {
        try {
            // the fetch will need to be (`http://localhost:5000/genre_posts/${genre.Genre_ID}`); once we have its own page setup
            // i still need to find a way to give a genre id its own page
            
            const response = await fetch(`http://localhost:5000/announcement`);
            const jsonData = await response.json(); //parse data

            setAnnouncements(jsonData); //changing state
            
        } catch(err) {
            console.error(err.message)
        }
    }
    // const deletePost = async (id) => {
    //     try {
    //         const deletePost = await fetch(`http://localhost:5000/posts/${id}`, {
    //             method: "DELETE"

    //         });
    //         //only display posts that fit filter condition
    //         setAnnouncements(posts.filter(Post => Post.Post_ID !== id))
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

    useEffect(() => {
        getAnnouncements();
    }, []); //ensure we only make one request
    // console.log(posts)

    return (
        <div className="container">
            <div className="row">
            {/* <span className="border border-2"></span> */}
                <div className="col">
                    {announcements.map(Announcement =>  
                        <>
                            <hr></hr>
                            <h1 key={Announcement.Announcement_ID}>{Announcement.Announcement_Text} </h1>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}



export default ListA;