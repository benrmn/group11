// Jay, Kiara, Dean, and Ben all worked on this file

// this file includes all of our imports for each component, as well as all routes that could be used in the app
import './App.css';
import React, { Fragment } from "react";
import Nav from './components/nav';
import FindLogin from './components/login';
import Home from './components/home';
import Post from './components/post';
import ShowPosts from './components/ShowPosts';
import UserPosts from './components/UserPosts';
import UserComments from './components/UserComments';
import UpdatePost from './components/UpdatePost';
import AddPG from './components/AddPG';
import ListPG from './components/ListPG';
import AddG from './components/AddG';
import ListG from './components/ListG';
import AddC from './components/AddC';
import ListC from './components/ListC';
import Banned from './components/Banned';
import Admin from './components/Admin';
import Leaderboard from './components/Leaderboard';


import Announcement from './components/Announcement';
import ListA from './components/ListA';
import UpdateA from './components/UpdateA';

import Register from './components/register';
import ShowUser from './components/ShowUser';
import UpdateUser from './components/UpdateUser';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" element={<><Home /><ListA /></>} />
            <Route path="/login" element={<FindLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<><ShowUser /><UpdateUser /></>} />
            <Route path="/post" element={<Post />} />
            <Route path="/show_posts" element={<ShowPosts />} />
            <Route path="/user_posts" element={<UserPosts />} />
            <Route path="/user_comments" element={<UserComments />} />
            <Route path="/lleaderboard" element={<Leaderboard />} />
            <Route path="/bans" element={<Banned />} />
            <Route path="/admins" element={<Admin />} />
            <Route path="/genre_posts/:id" element={<><Post /><ShowPosts /></>} />
            <Route path="/comment/:id" element={<><AddC /><ListC /></>} />
            <Route path="/genre" element={<><AddG /><ListG /></>} />
            <Route path="/priv_genre" element={<><AddPG /><ListPG /></>} />
            <Route path="/announcement" element={<Announcement />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
