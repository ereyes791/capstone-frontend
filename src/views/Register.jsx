import React, { useState } from 'react';
import { TextField, Button, Grid, 
  Dialog, DialogActions , DialogContent ,
   DialogContentText , DialogTitle  } from '@mui/material';
import NavigationBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';


function RegisterForm({url,setToken} ) {
  const navigationButtons = [{path: "/", name: "Home"}, {path: "/login", name: "Login"}];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [logfromserver, setLogfromserver] = useState('');
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleRegister = () => {
    // Here you can perform any registration logic, like validation or making API calls
    // For now, we'll just pass the form data to the parent component
    console.log({ firstName, lastName, email, password });
    // validate this data and create a message if one is empty and add to logfromserver a message
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      // verify if the email has @ and .
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        setLogfromserver('Please enter a valid email');
        setOpen(true);
        return;
      }
      setLogfromserver('Please fill all fields');
      setOpen(true);
      return;
    }

    fetch(url+'/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
      }).then(response => response.json())
        .then(result => {
            setLogfromserver(result.message);
            setOpen(true);
            navigate('/login');

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
            <form >
            <Grid container spacing={2} sx={{ marginTop:0, marginBottom:3}}>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Email & username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Grid>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRegister}
            >
                Register
            </Button>
            </form>
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
}

export default RegisterForm;