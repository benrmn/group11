//Kiara Berry coded this file

import React from 'react';
import {useNavigate } from 'react-router-dom';
import Post from './post';


//fixed navbar at top of screen
function Navbar() {
    const user = JSON.parse(localStorage.getItem("userinfo"));

    const navigate = useNavigate();

    if ("userinfo" in localStorage) {
        return (
            <>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={{ backgroundColor: "#E8E6D9" }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="javascript:;">Group 11</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">

                                <li className="nav-item">

                                    <a className="nav-link active" aria-current="page" href="javascript:;" onClick={() => navigate("/")} >Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="javascript:;" onClick={function () { localStorage.removeItem("userinfo"); navigate("/") }}>Logout</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </>

        );
    } else {
        return (
            <>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={{ backgroundColor: "#E8E6D9" }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="javascript:;">Group 11</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">

                                <li className="nav-item">

                                    <a className="nav-link active" aria-current="page" href="javascript:;" onClick={() => navigate("/")} >Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="javascript:;" onClick={() => navigate("/login")}>Login</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </>

        );
    }
}

export default Navbar;