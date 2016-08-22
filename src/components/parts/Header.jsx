"use strict";

import React from "react";

class Header extends React.Component {
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
            <header>
                <div className="ui grid">
                    <div className="fourteen wide column">
                        <h1 className="ui header">{this.props.title}</ h1>
                        <p>{this.props.speaker.first} {this.props.speaker.last}</p>
                    </div>
                    <div className="right floated right aligned column">
                    <span id="connection-status"
                        className={this.props.status}></span>
                    </div>
                </div>
                <div className="ui divider"></div>
            </header>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};

Header.defaultProps = {
    status: "disconnected"
};

export default Header;
