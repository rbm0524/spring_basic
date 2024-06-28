import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SignUp from './SignUp';
import logo from './logo.svg'; // 이미지 파일을 import

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    fetch("/showMe")
    .then((res) => res.json())
    .then((result) => {
      setData(result);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', { id, password });
      setLoginMessage(response.data);
    } catch (error) {
      setLoginMessage('Login error: ' + error.message);
    }
  };

  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Edit <code>src/App.js</code> and save to reload.</p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Routes>
              <Route path="/" element={
                <div>
                  <form onSubmit={handleLogin}>
                    <div>
                      <label>ID:</label>
                      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div>
                      <label>Password:</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                  </form>
                  {loginMessage && <p>{loginMessage}</p>}
                  <Link to="/signup">회원가입</Link>
                </div>
              } />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </header>
        </div>
      </Router>
  );
}

export default App;
