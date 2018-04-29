import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "./layout";
import createStore from '../store';

const store = createStore();

const jsx = (
    <ReduxProvider store={ store }>
        <Router>
            <Layout />
        </Router>
    </ReduxProvider>
);

const app = document.getElementById( "root" );
ReactDOM.render( jsx, app );
