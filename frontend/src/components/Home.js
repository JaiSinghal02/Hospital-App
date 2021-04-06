import { requirePropFactory } from '@material-ui/core';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <h1 style={{marginLeft:"20px"}}>Get Well Soon</h1>
            <div style={{width:"80%"}}>
                <h3 style={{marginLeft:"22px"}}>Book a Appointment with our World Class Doctors Today !</h3>
            </div>
            </>
        )
    }
}