"use strict";

import React from "react";
import Display from "./parts/Display.jsx";
import Join from "./parts/Join.jsx";
import AskMultiplechoices from "./parts/AskMultiplechoices.jsx";

class Audience extends React.Component {
    constructor(props) {
        super(props);
        this._bind();
        this.state = {};    // put get initial state here instead
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <div>
                <Display if={this.props.appState.status === "connected"}>
                    <Display if={this.props.appState.member.id}>
                        <a className="ui teal image label">
                            <i className="users icon"></i>
                            {this.props.appState.member.name
                                ? this.props.appState.member.name.first
                                : null}
                            <div className="detail">Audience</div>
                        </a>
                        <Display if={this.props.appState.currentQuestion}>
                            <h3 className="ui header">
                                <AskMultiplechoices
                                    emit={this.props.emit}
                                    question={this.props.appState.currentQuestion}/>
                            </h3>
                        </Display>
                    </Display>
                    <Display if={!this.props.appState.member.id}>
                        <h3>Join the session</h3>
                        <Join emit={this.props.emit}/>
                    </Display>
                </Display>
            </div>
        );
    }
}

Audience.propTypes = {};

Audience.defaultProps = {};

export default Audience;
