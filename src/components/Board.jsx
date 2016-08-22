"use strict";

import React from "react";
import { BarChart } from "react-d3-components";
import Display from "./parts/Display.jsx";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this._bind("_makeBarGraph");
        this.state = {};    // put get initial state here instead
    }

    _makeBarGraph(data) {
        // convert into array of {label, value}
        let talliedData = Object.keys(data).reduce((prev, curr) => {
            // tallying
            if (!prev[data[curr]]) {
                prev[data[curr]] = 0;
            }
            prev[data[curr]]++;
            return prev;
        }, {});
        let temp = Object.keys(talliedData).map((key) => ({
            x: key,
            y: talliedData[key]
        }));
        return [{
            values: temp.length === 0
                ? [{x: '-', y: 0}]
                : temp
        }];
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <div id="scoreboard">
                <Display
                    if={this.props.appState.status === "connected"
                    && this.props.appState.currentQuestion}>
                    <BarChart
                        title={this.props.appState.currentQuestion
                            ? this.props.appState.currentQuestion.q
                            : null}
                        data={this._makeBarGraph(this.props.appState.results)}
                        width={window.innerWidth * 0.6}
                        height={window.innerHeight * 0.6}
                        margin={{top: 10, bottom: 50, left: 50, right: 10}}
                    />
                </Display>
                <Display
                    if={this.props.appState.status === "connected"
                    && !this.props.appState.currentQuestion}>
                    <h3 className="ui header">
                        Awaiting a question...
                    </h3>
                </Display>
            </div>
        );
    }
}

Board.propTypes = {};

Board.defaultProps = {};

export default Board;
