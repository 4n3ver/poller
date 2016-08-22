"use strict";

import React from "react";

class Start extends React.Component {
    constructor(props) {
        super(props);
        this._bind("_formSubmitHandler");
        this.state = {};    // put get initial state here instead
    }

    _formSubmitHandler() {
        let payload = {
            member: {
                name: {
                    first: this.refs.firstName.value,
                    last : this.refs.lastName.value
                },
                type: "speaker",
            },
            title: this.refs.title.value
        };
        this.props.emit("start", payload);
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <form className="ui equal width form" action="javascript:void(0)"
                onSubmit={this._formSubmitHandler}>
                <div className="field">
                    <label>Presentation Title</label>
                    <input type="text" ref="title"
                        placeholder="Enter a title"
                        required/>
                </div>
                <div className="fields">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" ref="firstName"
                            placeholder="First Name"
                            required/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" ref="lastName"
                            placeholder="Last Name" required/>
                    </div>
                </div>
                <button className="ui small button" type="submit">Start</button>
            </form>
        );
    }
}

Start.propTypes = {};

Start.defaultProps = {};

export default Start;
