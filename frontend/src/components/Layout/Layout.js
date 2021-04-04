import React from 'react';
import NavBar from '../UI/navbar/navbar'

export default function layout(props){
    return (
        <>
        <NavBar></NavBar>
        {props.children}
        
        </>
    )
}