import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import * as actionTypes from '../../../../store/actions/action'

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
    console.log("time",event.target.value)
    
  };
  let Options=null;
  if(props.slots){
    Options=props.slots.map((val,i)=>{
      // console.log("MENU ITEM VAL-->",i)
      return (<MenuItem data-my-value={i} value={val.slice(0,5)}>{val.slice(0,5)}</MenuItem>)
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
const mapDispatchToProps = dispatch =>{
  return{
    setSlot: (slot)=> dispatch({type:actionTypes.SET_TIME_SLOT,slot:slot})
  }
}

export default connect(null,mapDispatchToProps)(Picker);
