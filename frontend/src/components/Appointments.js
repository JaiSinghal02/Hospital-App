import React, {Component} from 'react';
import {render} from 'react-dom';

export default class Appointments extends Component{
    constructor(props){
        super(props);
    }
    render(){
        {console.log(this.props)}
        return(
            
            <h1>HELLO This is the Appointments page</h1>
        )
    }
}