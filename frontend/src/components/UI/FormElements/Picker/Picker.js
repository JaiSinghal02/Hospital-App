import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import * as actionTypes from '../../../../store/actions/action'
import { createStore } from 'redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Picker(props) {
  const classes = useStyles();
  const [time, setTime] = React.useState('');

  const handleChange = (event) => {
    props.setSlot(event.target.value)
    setTime(event.target.value);

  };
  let Options = null;
  const createSlotTime = (time) => {
    let newTime = []
    let hr, min, nhr, nmin
    for (let i in time) {
      hr = parseInt(time[i].slice(0, 2))
      min = parseInt(time[i].slice(3, 5))
      if (min == 0) {
        nhr = hr;
        nmin = "30"
        min = "00"
      }
      else {
        nhr = hr + 1;
        nmin = "00"
      }
      if (hr >= 12) {
        newTime.push(((hr - 12) == 0 ? 12 : (hr - 12)) + ":" + min + "-" + ((nhr - 12) == 0 ? 12 : (nhr - 12)) + ":" + nmin + " pm")
      }
      else {
        newTime.push(hr + ":" + min + "-" + nhr + ":" + nmin + " am")
      }
    }
    return newTime
  }
  if (props.slots) {
    let slots = createSlotTime(props.slots)
    Options = slots.map((val, i) => {
      return (<MenuItem data-my-value={i} value={val}>{val}</MenuItem>)
    })
  }
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={time}
          onChange={handleChange}
          label="Time"
        >
          {Options}
        </Select>
      </FormControl>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    setSlot: (slot) => dispatch({ type: actionTypes.SET_TIME_SLOT, slot: slot })
  }
}

export default connect(null, mapDispatchToProps)(Picker);
