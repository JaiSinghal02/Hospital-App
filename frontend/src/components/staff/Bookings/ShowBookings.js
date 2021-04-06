import React, { Component } from 'react';
import DatePicker from '../../UI/FormElements/DatePicker/DatePicker'
import Grid from '@material-ui/core/Grid';
import { render } from 'react-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/action'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '../../UI/accordion/accordion'
import Modal from '../../UI/modal/modal'
import BackDrop from '../../UI/backdrop/backdrop'
import CircularProgress from '@material-ui/core/CircularProgress';

class ShowBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            choseDate: null,
            showModal: false,
            modalUserInfo: null,
            redirect: false,
            showSpinner:true
        }
    }
    showUserInfo(id) {
        let users = this.props.dateAppointments
        let user = null
        for (let i in users) {
            if (users[i]["id"] === id) {
                user = users[i]
                break
            }
        }
        if (user) {
            this.setState({ showModal: true, modalUserInfo: user })
        }
    }
    redirect() {
        this.setState({ redirect: true })
        setTimeout(() => {
            this.setState({ redirect: false })
            this.props.history.push('/')
        }, 1000)
    }
    render() {
        let loader = null
        if (this.state.loader) {
            loader = <BackDrop open="true" />
        }
        if (this.props.selectedDate && (this.state.chosenDate !== this.props.selectedDate)) {
            let token = localStorage.getItem("token");
            axios.get(`http://localhost:8000/api/account/appointments/${this.props.selectedDate}`, { headers: { 'Authorization': `Token ${token}` } })
                .then(res => { this.setState({ chosenDate: this.props.selectedDate,showSpinner:false }); this.props.setDateAppointments(res.data)})
                .catch(err => { console.log(err); this.redirect() })
        }
        let modal = null
        if (this.state.showModal) {
            modal = <Modal open="true" mode="STAFF" user={this.state.modalUserInfo} closeModal={() => { this.setState({ showModal: false }) }} />
        }
        let backdrop = null
        if (this.state.redirect) {
            backdrop = <BackDrop open={true} message="Un-Authorized ! Redirecting ...." />
        }
        let display=<div style={{width: '100%',marginTop: '100px',display: 'flex',justifyContent: 'center',alignItems: 'center'}}><CircularProgress style={{marginLeft: "30px"}}/></div>
        if(!this.state.showSpinner){
            display=<Accordion data={this.props.dateAppointments} mode="STAFF" showUserInfo={this.showUserInfo.bind(this)} />
        }

        return (
            <>
                {backdrop}
                {loader}
                {modal}
                <h2 style={{marginLeft: '15px'}}>Appointments</h2>
                <Grid container spacing={0} alignItems="center" justify="space-around">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6} sm={6}><DatePicker /></Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>
                </Grid>
                {display}
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        selectedDate: state.date,
        dateAppointments: state.currentDateAppointments
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setDateAppointments: (appointments) => dispatch({ type: actionTypes.SET_CURRENT_DATE_APPOINTMENTS, appointments: appointments })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBookings);