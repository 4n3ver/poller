"use strict";

import React from "react";

class Display extends React.Component {
    constructor(props) {
        super(props);
        this._bind();
        this.state = {};    // put get initial state here instead
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return this.props.if ? (
            <div>{this.props.children}</div>
        ) : null;
    }
}

Display.propTypes = {};

Display.defaultProps = {};

export default Display;
