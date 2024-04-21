// LoginView.js
import React, { useState } from 'react';
import { TextField, Button, Typography ,
  Dialog, DialogActions , DialogContent ,
   DialogContentText , DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/Navigation';
const LoginView = ({url,setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [logfromserver, setLogfromserver] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const navigationButtons = [{path: "/register", name: "Register"}, {path: "/", name: "Home"}];
  const handleLogin = () => {
    // Handle login logic here
    // check if the username and password are empty
    if (username === '' || password === '') {
      //check if username has a @ and a .
      if (username.indexOf('@') === -1 || username.indexOf('.') === -1) {
        setLogfromserver('Please enter a valid email');
        setOpen(true);
        return;
      }
      setLogfromserver('Please fill all fields');
      setOpen(true);
      return;
    }
    console.log('Username:', username);
    console.log('Password:', password);
    //conect to the server
    fetch(url+'/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    })
      .then(response => response.json())
      .then(data => {
        setToken(data.token);
        if(data.token){
          navigate('/');
        }
        else{
          setLogfromserver(data.message);
          setOpen(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setLogfromserver('Error: '+error);
        setOpen(true);
      });
  };

  return (
    <div>   
        <NavigationBar linksArrays={navigationButtons}/>
        <section className="register-main">
        <section className="body" >
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
      </section>
      </section>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Register Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {logfromserver}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginView;
