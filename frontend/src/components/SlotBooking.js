import React, {Component} from 'react';
import Picker from './UI/FormElements/Picker/Picker'
import {render} from 'react-dom';

export default class SlotBooking extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <h1>HELLO This is the Slot Booking Page</h1>
            <Picker/>
            </>
        )
    }
}