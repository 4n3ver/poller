"use strict";

import { render } from "react-dom";
import React from "react";
import { Router, Route, hashHistory } from "react-router";
import Audience from "./components/Audience.jsx";
import Speaker from "./components/Speaker.jsx";
import Board from "./components/Board.jsx";
import App from "./components/App.jsx";
import ErrorNotFound from "./components/Error-NotFound.jsx";
// <App/> actually invoke React.create() -> need to import React as well

render(
    (
        <Router history={hashHistory}>
            <Route component={App}> {/* always show on all routes */}
                <Route path="/" component={Audience}/> {/* / route */}
                <Route path="speaker"
                    component={Speaker}/>{/* /speaker route*/}
                <Route path="board" component={Board}/>{/* /board route */}
                <Route path="*" component={ErrorNotFound}/>
            </Route>
        </Router>
    ),
    document.querySelector("#app")
);

