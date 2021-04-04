import React, {Component} from 'react';
import {render} from 'react-dom';
import Home from './Home';
import SlotBooking from './SlotBooking'
import Appointments from './Appointments'
import {BrowserRouter, Route, Switch,Link} from 'react-router-dom';
import AuthForm from './Auth/AuthForm';
import UserInfo from './UserInfoForm/UserInfo'
import Layout from './Layout/Layout'

export default class App extends Component{
    constructor(props){
        super(props);
    }
    token=localStorage.getItem("token")
    render(){
        return(
            <Layout>
            <Switch>
            <Route  exact path="/account/signup" component={AuthForm}></Route>
            <Route  path="/account/signup/addinfo" component={UserInfo}></Route>
            <Route path="/account/slotbooking" component={SlotBooking}></Route>
            <Route path="/account/appointments" component={Appointments}></Route>
            <Route path="/" component={Home}></Route>
            </Switch>
            </Layout>

        )
    }
}
