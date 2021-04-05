import App from './components/App'
import {render} from 'react-dom';
import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import reducer from './store/reducers/reducer'

const store=createStore(reducer)
const app = (
    <Provider store={store}>
    <BrowserRouter>
            <App/>
    </BrowserRouter>

    </Provider>
)
const appDiv=document.getElementById("app");
render(app,appDiv)