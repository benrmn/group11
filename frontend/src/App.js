import './App.css';
import React, { Fragment, useState, useEffect } from "react";
import Nav from './components/nav';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

import Post from './components/post';
import ShowPosts from './components/ShowPosts';
import AddPG from './components/AddPG';
import ListPG from './components/ListPG';
import AddG from './components/AddG';
import ListG from './components/ListG';
import AddC from './components/AddC';
import ListC from './components/ListC';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
toast.configure();

function App() {

  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuth(true) : setIsAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const [isAuth, setIsAuth] = useState(true);

  // const setAuth = (boolean) => {
  //   setIsAuth(boolean);
  // };

  return (
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
          <Route exact path="/home" render={props => isAuth ? <Home {...props} /> : navigate("/login")} element={<Home />} />
          <Route exact path="/login" render={props => !isAuth ? <Login {...props} /> : navigate("/home")} element={<Login />} />
          <Route exact path="/register" render={props => !isAuth ? <Register {...props} /> : navigate("/login")} element={<Register />} />
            <Route path="/post" element={<Post />} />
            <Route path="/show_posts" element={<ShowPosts />} />
            <Route path="/genre_posts/:id" element={<><Post /><ShowPosts /></>} />
            <Route path="/comment/:id" element={<><AddC /><ListC /></>} />
            <Route path="/genre" element={<><AddG /><ListG /></>} />
            <Route path="/priv_genre" element={<><AddPG /><ListPG /></>} />
          </Routes>
        </header>
    </div>
  );
}

export default App;
