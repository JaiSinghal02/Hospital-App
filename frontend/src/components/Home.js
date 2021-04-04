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
            <h1>HELLO man This is the main page</h1>
            </>
        )
    }
}