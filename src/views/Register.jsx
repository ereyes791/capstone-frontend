import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import NavigationBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

function RegisterForm({setToken} ) {
  const navigationButtons = [{path: "/", name: "Home"}, {path: "/login", name: "Login"}];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Here you can perform any registration logic, like validation or making API calls
    // For now, we'll just pass the form data to the parent component
    console.log({ firstName, lastName, email, password });
    fetch('http://localhost:3000/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
      }).then(response => response.json())
        .then(result => {
          console.log(result);
            setToken(result.token);
        })
        .catch(console.error);

  };

  return (
    <div>   
        <NavigationBar linksArrays={navigationButtons}/>
        <section className="register-main">
        <section className="body">
            <form>
            <Grid container spacing={2}>
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
                    label="Email"
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
    </div>
  );
}

export default RegisterForm;