//Kiara Berry coded this file
//Lists all announcements on home page - each with an edit and delete button

import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import UpdateA from "./UpdateA";


function ListA() {
    const [announcements, setAnnouncements] = useState([]);
    const user = JSON.parse(localStorage.getItem("userinfo"));

    //const { id } = useParams();
    //console.log(id);
    const getAnnouncements = async() => {
        try {
            
            const response = await fetch(`http://localhost:5000/announcement`);
            const jsonData = await response.json(); //parse data

            setAnnouncements(jsonData); //changing state
            
        } catch(err) {
            console.error(err.message)
        }
    }
    const deleteAnnouncement = async (id) => {
        try {
            const deleteAnnouncement = await fetch(`http://localhost:5000/announcement/${id}`, {
                method: "DELETE"

            });

            setAnnouncements(announcements.filter(Announcement => Announcement.Announcement_ID !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getAnnouncements();
    }, []); //ensure we only make one request
    // console.log(posts)

    //announcements can only have edit and delete option if user logged in is admin
    if ("userinfo" in localStorage) {
        if (user.isAdmin) {
            return (
                <div className="container">
                    <div className="row">
                        {/* <span className="border border-2"></span> */}
                        <div className="col">
                            {announcements.map(Announcement =>
                                <>
                                    <hr></hr>
                                    <h1 key={Announcement.Announcement_ID}>{Announcement.Announcement_Text} </h1>
                                    <UpdateA Announcement={Announcement} />
                                    <button onClick={() => deleteAnnouncement(Announcement.Announcement_ID)}>Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            );
        } else {
            //if user is not an admin will only view announcements without edit and delete
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
    } else {
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
}



export default ListA;