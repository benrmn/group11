// import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Login from './components/login';
import Home from './components/home';
import Post from './components/post';

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
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
