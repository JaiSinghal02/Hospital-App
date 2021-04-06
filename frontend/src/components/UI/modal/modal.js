import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  tag: {
    fontWeight: 'bold'
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  let createHead = (str) => {
    let arr = str.split("")
    arr[0] = str[0].toUpperCase()
    let i = str.indexOf("_")
    if (i !== -1) {
      arr[i + 1] = str[i + 1].toUpperCase()
      arr[i] = " "
      // return( arr.slice(0,i).join("")+" "+arr.slice(i))
    }
    return (arr.join(""))
  }
  if (props.mode === "PATIENT") {
    return (<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Confirm Booking ?</DialogTitle>
      <List>
        <ListItem button >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <CalendarTodayIcon color="primary" />

            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.data1} />
        </ListItem>

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AccessTimeIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.data2} />
        </ListItem>
      </List>
      <Grid container>
        <Button color="primary" onClick={props.proceed}>Proceed</Button>
        <Button color="secondary" onClick={props.closeModal}>Cancel</Button>
      </Grid>

    </Dialog>)
  }
  else if (props.mode === "STAFF") {
    let user = props.user
    let modalInfo = []
    for (let i in user) {
      if (i !== "id" && i !== "slot" && i !== "user") {
        let head = createHead(i)
        modalInfo.push(
          <ListItem button key={head} >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <LabelImportantIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={head + " : " + user[i]} classes={{ primary: classes.tag }} />
          </ListItem>
        )
      }
    }
    return (<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Patient Info</DialogTitle>
      <List>
        {modalInfo}
      </List>
      <Grid container>
        <Button color="primary" onClick={props.closeModal}>Close</Button>
      </Grid>

    </Dialog>)
  }
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Modal(props) {
  return (
    <div>
      <SimpleDialog open={props.open} onClose={props.closeModal} {...props} />
    </div>
  );
}
