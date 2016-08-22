"use strict";

import React from "react";
import io from "socket.io-client";
import { RouteHandler } from "react-router";
import Header from "./parts/Header.jsx";

const SERVER = "http://localhost:8000";

class App extends React.Component {
    constructor(props) {
        super(props);
        this._bind(
            "_socketConnectedHandler", "_socketDisconnectedHandler", "_emit",
            "_joinedHandler", "_audiencesHandler", "_askHandler",
            "_resultsHandler"
        );
        this.state = {
            status         : "disconnected",
            title          : '',
            member         : {},
            audiences      : [],
            speaker        : {},
            questions      : [],
            results        : {},
            currentQuestion: null
        };    // put get initial state here instead
    }

    componentWillMount() {
        this.socket = io(SERVER);
        this.socket.on("connect", this._socketConnectedHandler);
        this.socket.on("disconnect", this._socketDisconnectedHandler);
        this.socket.on("joined", this._joinedHandler);
        this.socket.on("audiences", this._audiencesHandler);
        this.socket.on("ask", this._askHandler);
        this.socket.on("results", this._resultsHandler);
        this.socket.on("welcome", x => this.setState(x));
        this.socket.on("start", x => this.setState(x));
        this.socket.on("end", x => this.setState(x));
    }

    _socketConnectedHandler() {
        let data = sessionStorage.data
            ? JSON.parse(sessionStorage.data)
            : null;
        if (data && data.member) {
            if (data.member.type === "speaker") {
                this._emit("start", data);
            } else if (data.member.type === "audience") {
                this._emit("join", data);
            }
        }
        this.setState({status: "connected"});
        console.log(`Connected to ${this.socket.id}`);
    }

    _socketDisconnectedHandler() {
        this.setState(
            {
                status : "disconnected",
                title  : "disconnected",
                speaker: ""
            }
        );
        console.log(`Disconnected to ${SERVER}`);
    }

    _joinedHandler(payload) {
        sessionStorage.data = JSON.stringify(payload);
        console.log(payload);
        this.setState({member: payload.member});
    }

    _audiencesHandler(audiences) {
        this.setState({audiences});
    }

    _resultsHandler(results) {
        this.setState({results});
    }

    _askHandler(question) {
        console.log(`Speaker asked: ${question.q}`);
        sessionStorage.answer = "";
        this.setState(
            {
                currentQuestion: question,
                results        : {}
            }
        );
    }

    _emit(event, payload) {
        this.socket.emit(event, payload);
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <div className="ui container">
                <Header
                    title={this.state.title}
                    status={this.state.status}
                    speaker={this.state.speaker}
                />
                {React.cloneElement(
                    this.props.children,
                    {
                        emit    : this._emit,
                        appState: this.state
                    }
                )}
            </div>
        );
    }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
