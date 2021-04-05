import React, {Component} from 'react';
import Picker from './UI/FormElements/Picker/Picker'
import DatePicker from './UI/FormElements/DatePicker/DatePicker'
import Grid from '@material-ui/core/Grid';
import {render} from 'react-dom';
import {connect} from 'react-redux'
import * as actionTypes from '../store/actions/action'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        height: '90px'
    },
    button: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(1),
    },
});
class SlotBooking extends Component{
    constructor(props){
        super(props);
        this.state = {
            chosenDate: null
        }
    }
    book(){
        let data={};
        
        if(this.props.bookedSlot){
            let token=localStorage.getItem("token");
            data[this.props.selectedDate]=this.props.bookedSlot;
            console.log("SENDING DATA-->",JSON.parse(JSON.stringify(data)))
            axios.post("http://localhost:8000/api/bookslot",JSON.parse(JSON.stringify(data)),{headers:{'Authorization': `Token ${token}`}})
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})
        }
    }
    
    
    render(){
        
        const {classes} = this.props
        if(this.props.selectedDate && this.props.selectedDate !== this.state.chosenDate){
            console.log("1st-->",this.props.selectedDate,"\n2nd-->",this.state.chosenDate,this.props.selectedDate !== this.state.chosenDate)
            console.log("SD",this.props.selectedDate)
            axios.get(`http://localhost:8000/api/availableslots/${this.props.selectedDate}`)
            .then(res=>{console.log(res,"selectedDate-->",this.props.selectedDate); this.setState({chosenDate:this.props.selectedDate}); this.props.setTime(res.data); })
            .catch(err=>{console.log(err)})
        }
        return(
            <>
            <h1>HELLO This is the Slot Booking Page</h1>
            <Grid container spacing={0} alignItems="center"  justify="space-around">
            <Grid item xs={1}></Grid>
                <Grid item xs={6} sm={6}><DatePicker/></Grid>
                <Grid item xs={4}><Picker slots={this.props.availableTime} /></Grid>
                <Grid item></Grid>
                <Grid item></Grid>
            </Grid>
            <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.book.bind(this)}
                    >
                        Book Appointment
                                    </Button>
                </div>
            </>
        )
    }
}
const mapStateToProps = state=>{
    return {
        selectedDate: state.date,
        availableTime: state.time,
        bookedSlot: state.selectedSlot
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        setTime: (time)=> dispatch({type: actionTypes.SET_TIME,time:time})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(SlotBooking));