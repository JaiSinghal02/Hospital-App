import React from 'react';
import NavBar from '../UI/navbar/navbar'

export default function layout(props) {
    return (
        <>
            <NavBar logOutUser={props.logOutUser} isStaff={props.isStaff}></NavBar>
            {props.children}
        </>
    )
}