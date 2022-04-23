import './App.css';
import React, { Fragment } from "react";
import Nav from './components/nav';
import Login from './components/login';
import Home from './components/home';
import Post from './components/post';
import AddPG from './components/AddPG';
import ListPG from './components/ListPG';
import UpdatePG from './components/UpdatePG';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<Post />} />
            <Route path="/priv_genre"
              element={<><ListPG /><AddPG /></>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
