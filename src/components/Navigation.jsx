import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationBar({ linksArrays }) {
  // Component code here
NavigationBar.propTypes = {
  linksArrays: PropTypes.array.isRequired,
};

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Capstone
        </Typography>
        {linksArrays?linksArrays.map((link) => (
          <Button color="inherit" key={link.path} component={Link} to={link.path}>{link.name}</Button>
        )):null}
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;