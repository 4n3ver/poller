"use strict";

import React from "react";

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this._bind("_addQuestion", "_ask");
        this.state = {};    // put get initial state here instead
    }

    _ask(question) {
        this.props.emit("ask", question);
    }

    _addQuestion(q, i) {
        return (
            <div className="column" key={i}>
                <div className="fluid ui animated button"
                    onClick={this._ask.bind(null, q)}>
                    <div className="visible content">
                        <div className="ui medium header">
                            {/*question goes here*/}
                            {q.question}
                        </div>
                        <p>
                            {/*correct answer goes here*/}
                            {q.a}
                        </p>
                    </div>
                    <div className="hidden content">
                        {/*options goes here*/}
                    </div>
                </div>
            </div>
        );
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <div className="column">
                <div className="ui violet segment">
                    <div className="ui blue label">
                        Questions
                    </div>
                    <div className="ui grid">
                        <div className="doubling two column row">
                            {this.props.questions.map(this._addQuestion)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Questions.propTypes = {};

Questions.defaultProps = {};

export default Questions;
