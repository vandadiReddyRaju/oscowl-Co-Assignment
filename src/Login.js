import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    if (email && password) {
        localStorage.setItem('authToken', 'dummyToken'); // Set token on successful login
        navigate('/home'); // Redirect to home page
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <div style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        <div>
          <span>Don't have an account? </span>
          <a href="/signup" style={styles.link}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' },
  form: { width: '300px', display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '1em', borderRadius: '5px', border: '1px solid #ddd' },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  link: { color: '#4caf50', textDecoration: 'none' }
};

export default Login;
