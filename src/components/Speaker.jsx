"use strict";

import React from "react";
import Display from "./parts/Display.jsx";
import Start from "./parts/Start.jsx";
import Attendance from "./parts/Attendance.jsx";
import Questions from "./parts/Questions.jsx";

class Speaker extends React.Component {
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
                <Display if={this.props.appState.member.id
                && this.props.appState.member.type === "speaker"}>
                    <a className="ui yellow image label">
                        <i className="spy icon"></i>
                        {this.props.appState.member.name
                            ? this.props.appState.member.name.first
                            : null}
                        <div className="detail">Speaker</div>
                    </a>
                    <div className="ui grid">
                        <div className="row">
                            <Questions
                                questions={this.props.appState.questions}
                                emit={this.props.emit}
                            />
                        </div>
                        <div className="two column doubling row">
                            <Attendance
                                audiences={this.props.appState.audiences}/>
                        </div>
                    </div>
                </Display>
                <Display if={!this.props.appState.member.id}>
                    <h3>Join the session</h3>
                    <Start emit={this.props.emit}/>
                </Display>
            </div>
        );
    }
}

Speaker.propTypes = {};

Speaker.defaultProps = {};

export default Speaker;
