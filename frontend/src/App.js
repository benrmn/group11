import './App.css';
import React, { Fragment } from "react";
import Nav from './components/nav';
import FindLogin from './components/login';
import Home from './components/home';
import Post from './components/post';
import AddPG from './components/AddPG';
import ListPG from './components/ListPG';
import AddG from './components/AddG';
import ListG from './components/ListG';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<FindLogin />} />
            <Route path="/post" element={<Post />} />
            <Route path="/genre" element={<><AddG /><ListG /></>} />
            <Route path="/priv_genre" element={<><AddPG /><ListPG /></>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
