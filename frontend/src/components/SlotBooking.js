import React, { Component } from 'react';
import Picker from './UI/FormElements/Picker/Picker'
import DatePicker from './UI/FormElements/DatePicker/DatePicker'
import Grid from '@material-ui/core/Grid';
import { render } from 'react-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions/action'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PopUp from './UI/PopUp/PopUp'
import Modal from './UI/modal/modal'
import Backdrop from './UI/backdrop/backdrop'
import Accordion from './UI/accordion/accordion'

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
class SlotBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: null,
            err: {
                status: false,
                message: ""
            },
            booked: {
                status: false,
                message: ""
            },
            showModal: false,
            loader: false

        }
    }
    componentDidMount() {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8000/api/account/pastbookings", { headers: { 'Authorization': `Token ${token}` } })
            .then(res => { this.props.setUserBookings(res.data) })
            .catch(err => { console.log(err) })
    }
    setError(err) {
        this.setState({ err: { status: true, message: err.message }, loader: false })
    }
    unSetError() {
        this.setState({ err: { status: false, message: "" } })
    }
    setBooked(data) {
        this.setState({ booked: { status: true, message: data.message } })
    }
    unSetBooked() {
        this.setState({ booked: { status: false, message: "" } })
    }
    confirmBook() {
        this.setState({ showModal: false, loader: true })
        let data = {};
        let token = localStorage.getItem("token");
        data[this.props.selectedDate] = this.props.bookedSlot;
        axios.post("http://localhost:8000/api/bookslot", JSON.parse(JSON.stringify(data)), { headers: { 'Authorization': `Token ${token}` } })
            .then(res => { this.setBooked(res.data) })
            .catch(err => { this.setError(err.response.data) })
    }
    book() {
        if (this.props.bookedSlot) {
            this.setState({ showModal: true })

        }
        else {
            this.setError({ message: "Select a Time" })
        }


    }


    render() {
        let showError = null
        if (this.state.err["status"]) {
            showError = <PopUp severity="error" open="true" message={this.state.err["message"]} timer="4000" />
            setTimeout(() => {
                this.unSetError()
            }, 4000)
        }
        let showSuccess = null
        if (this.state.booked["status"]) {
            showSuccess = <PopUp severity="sucess" open="true" message={this.state.booked["message"]} timer="4000" />
            setTimeout(() => {
                this.unSetBooked()
            }, 4000)
        }
        let modal = null
        if (this.state.showModal) {
            modal = <Modal
                open="true"
                data1={this.props.selectedDate}
                data2={this.props.bookedSlot}
                closeModal={() => { this.setState({ showModal: false }) }}
                proceed={this.confirmBook.bind(this)}
                mode="PATIENT"
            />

        }
        let loader = null
        if (this.state.loader) {
            loader = <Backdrop open="true" />
        }

        const { classes } = this.props
        if (this.props.selectedDate && this.props.selectedDate !== this.state.chosenDate) {
            axios.get(`http://localhost:8000/api/availableslots/${this.props.selectedDate}`)
                .then(res => { this.setState({ chosenDate: this.props.selectedDate }); this.props.setTime(res.data); })
                .catch(err => { console.log(err) })
        }
        return (
            <>
                {modal}
                {loader}
                <h3 style={{marginLeft: '15px'}}>Appointment</h3>
                <Grid container spacing={0} alignItems="center" justify="space-around">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6} sm={6}><DatePicker /></Grid>
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
                {showError}
                {showSuccess}
                <Accordion data={this.props.userBookings} mode="PATIENT" style={{marginTop: '30px'}} />
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        selectedDate: state.date,
        availableTime: state.time,
        bookedSlot: state.selectedSlot,
        userBookings: state.currentUserBookings
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTime: (time) => dispatch({ type: actionTypes.SET_TIME, time: time }),
        setUserBookings: (bookings) => dispatch({ type: actionTypes.SET_CURRENT_USER_BOOKINGS, bookings: bookings })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SlotBooking));