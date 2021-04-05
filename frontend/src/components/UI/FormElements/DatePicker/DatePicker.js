import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {connect} from 'react-redux'
import * as actionTypes from  '../../../../store/actions/action'

function DatePicker(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    props.setDate(date.getFullYear()+"-"+(Math.floor((date.getMonth()+1)/10)===0?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(Math.floor((date.getDate())/10)===0?("0"+(date.getDate())):(date.getDate())))
    setSelectedDate(date);
    
  };
  let today=new Date()
  today.setDate(today.getDate()+30);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select a Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          disablePast="true"
          maxDate={today}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
const mapDispatchToProps = dispatch=>{
    return {
        setDate: (date)=> dispatch({type: actionTypes.SET_DATE,date:date})
    }
}
export default connect(null,mapDispatchToProps)(DatePicker);