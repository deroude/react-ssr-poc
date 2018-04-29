import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import createStore from "./store";
import * as Actions from "./actions";
import routes from "./routes";
import Layout from "./components/layout";

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "..", "build", "static")));

const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

app.get("/*", (req, res) => {
    const context = {};
    const store = createStore({ loading: true });
    let alreadySent = false;
    store.dispatch({ type: Actions.SESSION_INITIALIZE });

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }

        const jsx = (
            <ReduxProvider store={store}>
                <StaticRouter context={context} location={req.url}>
                    <Layout />
                </StaticRouter>
            </ReduxProvider>
        );
        //Do a first render, this will trigger components who load data to perform the load
        //Make sure they also send the "loading" action
        let reactDom = renderToString(jsx);
        const helmetData = Helmet.renderStatic();

        //Now listen on the store. when loading is set to false send back the response
        //This will not work multithreaded!!!!! we need to subscribe each request separately
        store.subscribe(() => {
            if (store.getState().loading === false && !alreadySent) {
                const reduxState = store.getState();
                //Do a second render, that will pick up the updated redux state
                reactDom = renderToString(jsx);
                res.writeHead(200, { "Content-Type": "text/html" });
                const RenderedApp = htmlData.replace('{{SSR}}', reactDom)
                    .replace('<meta-head/>', helmetData)
                    .replace('__data__', JSON.stringify(reduxState));
                res.end(RenderedApp)
                alreadySent = true;
            }
        })
    })

});

app.listen(2048);