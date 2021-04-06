import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Link as RouterLink, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  let token = localStorage.getItem("token");
  let navItems = (<NavLink to='/account/signup' style={{ color: "inherit", textDecoration: "none" }}>
    <Button color="inherit" >Login</Button>
  </NavLink>)
  if (token) {
    let path = '/account/slotbooking'
    if (props.isStaff === true) {
      path = '/account/appointments'
    }
    navItems = (<><NavLink to={path} style={{ color: "inherit", textDecoration: "none" }}>
      <Button color="inherit" >Appointment</Button>
    </NavLink><NavLink to='/' style={{ color: "inherit", textDecoration: "none" }}>
        <Button color="inherit" onClick={props.logOutUser} >Log Out</Button>
      </NavLink></>)
  }
  return (


    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <LocalHospitalIcon className={classes.menuButton}/>
            <Typography variant="h6" className={classes.title}>
            Get Well Soon
          </Typography>
          </IconButton>

          </NavLink>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <NavLink to='/' style={{ color: "inherit", textDecoration: "none" }}>
            <Button color="inherit" >Home</Button>
          </NavLink>
          {navItems}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar
