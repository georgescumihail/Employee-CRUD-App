import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Header.css';

const Header = props => {

    const handleAddClick = () => {
        props.history.push({
            pathname: "/add-employee"
        });
    }

    return (

        <div id="header-container">
            <div id="header-title">Employees management dashboard</div>
            <div id="add-container">
                <button onClick={() => handleAddClick()} id="add-button">Add Employee</button>
            </div>
        </div>
    );
}

export default withRouter(Header);