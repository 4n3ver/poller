"use strict";

import React from "react";
import Display from "./Display.jsx";

class AskMultipleChoices extends React.Component {
    constructor(props) {
        super(props);
        this._bind("_addChoiceButton", "_setupChoices",
                   "_selectAnswerHandler");
        this.state = {
            choices: [],
            answer : void 0
        };    // put get initial state here instead
    }

    componentWillMount() {
        this._setupChoices();
    }

    componentWillReceiveProps() {
        this._setupChoices();
    }

    _addChoiceButton(choice, i) {
        return (
            <div key={i} className="column">
                <button className="fluid ui compact standard button"
                    onClick={this._selectAnswerHandler.bind(null, choice)}>
                    {choice}. {this.props.question.options[choice]}
                </button>
            </div>
        );
    }

    _setupChoices() {
        let choices = Object.keys(this.props.question.options);
        this.setState(
            {
                choices,
                answer: sessionStorage.answer
            }
        );
    }

    _selectAnswerHandler(answer) {
        this.setState({answer});
        sessionStorage.answer = answer;
        this.props.emit("answer", {
            question: this.props.question,
            answer  : answer
        });
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui label">
                    Question
                </div>
                <div id="currentQuestion">
                    <h3 className="ui header">{this.props.question.question}</h3>
                    <Display if={!this.state.answer}>
                        <div className="ui grid">
                            <div className="two column doubling row">
                                {this.state.choices.map(this._addChoiceButton)}
                            </div>
                        </div>
                    </Display>
                    <Display if={this.state.answer}>
                        <div className="ui basic segment">
                            Your answer:
                            <button
                                className="fluid ui disabled compact standard button">
                                {this.state.answer}. {this.props.question.options[this.state.answer]}
                            </button>
                        </div>
                    </Display>
                </div>
            </div>
        );
    }
}

AskMultipleChoices.propTypes = {};

AskMultipleChoices.defaultProps = {};

export default AskMultipleChoices;
