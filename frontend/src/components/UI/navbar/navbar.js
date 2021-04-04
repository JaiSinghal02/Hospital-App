import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link as RouterLink, NavLink} from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  let token=localStorage.getItem("token");
  let navItems=(<NavLink to='/account/signup' style={{color: "inherit",textDecoration: "none"}}>
  <Button color="inherit" >Login</Button>
  </NavLink>)
  if(token){
    navItems=(<NavLink to='/account/slotbooking' style={{color: "inherit",textDecoration: "none"}}>
    <Button color="inherit" >Book Appointment</Button>
    </NavLink>)
  }
  return (


    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <NavLink to='/' style={{color: "inherit",textDecoration: "none"}}>
          <Button color="inherit" >Home</Button>
          </NavLink>
          {navItems}
        </Toolbar>
      </AppBar>
    </div>
  );
}
