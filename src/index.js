import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import './index.css';
import Layout from "./components/layout";
import createStore from './store';

console.log(window.REDUX_DATA);
const store = createStore(window.REDUX_DATA);

const jsx = (
    <ReduxProvider store={ store }>
        <Router>
            <Layout />
        </Router>
    </ReduxProvider>
);

const app = document.getElementById( "root" );
ReactDOM.hydrate( jsx, app );
