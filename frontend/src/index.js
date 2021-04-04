import App from './components/App'
import {render} from 'react-dom';
import React from 'react'
import {BrowserRouter} from 'react-router-dom';


const app = (
    <BrowserRouter>
            <App/>
    </BrowserRouter>
)
const appDiv=document.getElementById("app");
render(app,appDiv)