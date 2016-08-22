"use strict";

import {Link} from "react-router";
import React from "react";

class Join extends React.Component {
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
                type: "audience"
            }
        };
        this.props.emit("join", payload);
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <form className="ui equal width form" action="javascript:void(0)"
                onSubmit={this._formSubmitHandler}>
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
                <button className="ui small button" type="submit">Join</button>
                <Link to="/speaker">Join as speaker instead</Link>
                <Link to="/board">Go to the board</Link>
            </form>
        );
    }
}

Join.propTypes = {};

Join.defaultProps = {};

export default Join;
