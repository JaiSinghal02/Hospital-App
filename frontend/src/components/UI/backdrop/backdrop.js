import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#acbbd194',
    color: 'black',
    fontWeight: 'bolder'
  },
}));

export default function backdrop(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open} onClick={props.handleClose}>
        <CircularProgress color="primary" />
        <Typography>{props.message}</Typography>
      </Backdrop>
    </div>
  );
}
