'use strict';

import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TopBanner extends Component {

    state = {
        activeKey : 1
    }

    handleSelect = k => {
        this.setState({activeKey: k});
    }

    render() {
        return (
            <ul onClick={this.handleSelect}>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/explore">Explore</Link></li>
                <li><Link to="/run_sql">Run SQL</Link></li>
                <li><Link to="/user">User Manager</Link></li>
            </ul>
        )
    }
}

export default TopBanner;
