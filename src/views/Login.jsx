// LoginView.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/Navigation';
const LoginView = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const navigationButtons = [{path: "/register", name: "Register"}, {path: "/", name: "Home"}];
  const handleLogin = () => {
    // Handle login logic here

    console.log('Username:', username);
    console.log('Password:', password);
    //conect to the server
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Save the token to local storage
        setToken(data.token);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <NavigationBar linksArrays={navigationButtons}/>
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginView;
