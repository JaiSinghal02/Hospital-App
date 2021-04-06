import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './Home';
import SlotBooking from './SlotBooking'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AuthForm from './Auth/AuthForm';
import UserInfo from './UserInfoForm/UserInfo'
import Layout from './Layout/Layout'
import ShowBookings from './staff/Bookings/ShowBookings'
import BackDrop from './UI/backdrop/backdrop'
import PopUp from './UI/PopUp/PopUp'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions/action'
import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBackDrop: false,
            backDropMessage: "",
            popUp:{
                message:"",
                severity: "",
                show:false,
                timer:"0000"
            }
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        if(token){
            axios.get("http://localhost:8000/api/account/checkstaffstatus", { headers: { 'Authorization': `Token ${token}` } })
                .then(res => { this.props.autoStaffStatus(res.data['is_staff']) })
                .catch(err => { alert(err) })
        }
    }
    showPopUp(msg,sev,show,timer){
        this.setState(prev=>({...prev,popUp:{message:msg,severity:sev,show:show,timer:timer}}))
        setTimeout(()=>{
            this.setState(prev=>({...prev,popUp:{message:"",severity:"",show:false,timer:"0000"}}))
        },timer)
    }
    logOut() {

        this.setState({ showBackDrop: true, backDropMessage: "Logging User Out ...." })
        axios.post("http://localhost:8000/api/account/logout")
        
        .then(res=>{
            setTimeout(() => {
                this.showPopUp(res.data.message,"success",true,"2000")
                localStorage.clear()
                this.props.logOut()
                this.setState({ showBackDrop: false, backDropMessage: "" })
                
            }, 1500)
        })
        .catch(err=>{
            this.showPopUp("Log out Unsuccessful","error",true,"2000")
            console.log(err)
        })
        

    }

    render() {
        let token = localStorage.getItem("token")
        if (token) {
            this.props.autoLogIn()
        }

        let display = <Switch>
            <Route exact path="/account/signup" component={AuthForm}></Route>
            <Route path="/" component={Home}></Route>
            <Redirect to="/" />
        </Switch>
        if (token) {
            display = <Switch>
                <Route exact path="/account/signup" component={AuthForm}></Route>
                <Route path="/account/signup/addinfo" component={UserInfo}></Route>
                <Route path="/account/slotbooking" component={SlotBooking}></Route>
                <Route path="/account/appointments" component={ShowBookings}></Route>
                <Route path="/" component={Home}></Route>
                <Redirect to="/" />
            </Switch>
        }
        let backDrop = null
        if (this.state.showBackDrop) {
            backDrop = <BackDrop open="true" message={this.state.backDropMessage} />
            display = null
        }
        let popUp=null
        let popInfo=this.state.popUp
        if(popInfo.show){
            popUp=<PopUp open={true} message={popInfo.message} severity={popInfo.severity} timer={popInfo.timer}/>
        }
        return (
            <>
                {backDrop}
                <Layout logOutUser={this.logOut.bind(this)} isStaff={this.props.isStaff}>
                    {display}
                </Layout>
                {popUp}
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.loggedIn,
        isStaff: state.isStaff

    }
}
const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch({ type: actionTypes.SET_USER_LOG_OUT }),
        autoLogIn: () => dispatch({ type: actionTypes.SET_USER_LOG_IN }),
        autoStaffStatus: (status) => dispatch({ type: actionTypes.SET_STAFF_STATUS, isStaff: status })

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
