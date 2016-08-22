"use strict";

import React from "react";
import {Link} from "react-router";

class NotFound extends React.Component {
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
            <div id="not-found">
                <h1>Sorry!</h1>
                <p>We cannot find the requested page.</p>
                <p>Were you looking for one of these:</p>
                <Link to="/">Join as Audience</Link>
                <Link to="/speaker">Start the Presentation</Link>
                <Link to="/board">View the Board</Link>
            </div>
        );
    }
}

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
