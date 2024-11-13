import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle signup
  const handleSignup = () => {
    if (email && password) {
      // Simulate signup success and redirect to login
      localStorage.setItem('authToken', 'dummyToken'); 
      navigate('/login');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
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
        <button onClick={handleSignup} style={styles.button}>Sign Up</button>
        <div>
          <span>Already have an account? </span>
          <a href="/login" style={styles.link}>Login</a>
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

export default Signup;

