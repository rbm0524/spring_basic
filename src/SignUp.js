import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/signup', { id, password });
      setSignupMessage(response.data);
      if (response.data === 'Signup Successful') {
        navigate('/'); // 회원가입 성공 시 로그인 페이지로 이동
      }
    } catch (error) {
      setSignupMessage('Signup error: ' + error.message);
    }
  };

  return (
      <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
          <div>
            <label>ID:</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">회원가입</button>
        </form>
        {signupMessage && <p>{signupMessage}</p>}
      </div>
  );
}

export default SignUp;
