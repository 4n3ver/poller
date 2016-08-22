"use strict";

import React from "react";

class Attendance extends React.Component {
    constructor(props) {
        super(props);
        this._bind("_addAudienceRow");
        this.state = {};    // put get initial state here instead
    }

    _addAudienceRow(audience, i) {
        return (
            <tr key={i}>
                <td>
                    <h4 className="ui image header">
                        <i className="user icon"></i>
                        <div className="content">
                            {audience.name.last}, {audience.name.first}
                            <div className="sub header">
                                Audience
                            </div>
                        </div>
                    </h4>
                </td>
                <td>
                    22
                </td>
            </tr>
        );
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <div className="column">
                <div className="ui olive segment">
                    <div className="ui label">
                        Attendance
                    </div>
                    <div className="ui mini right floated statistic">
                        <div className="value">
                            {this.props.audiences.length}
                        </div>
                        <div className="label">
                            Audiences
                        </div>
                    </div>
                    <table className="ui very basic striped selectable table">
                        <thead>
                        <tr>
                            <th>Audience</th>
                            <th>Correct</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.audiences.map(this._addAudienceRow)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Attendance.propTypes = {};

Attendance.defaultProps = {};

export default Attendance;
