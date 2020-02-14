import React from 'react';
import { useHistory } from 'react-router';
import './Header.css';

const Header = () => {

    const history = useHistory();

    const handleAddClick = () => {
        history.push({
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

export default Header;