import React from 'react';
import EmployeesTable from './EmployeesTable';
import Header from './Header';

const MainPage = () => {
    return (
        <div id="main-container">
            <Header />
            <EmployeesTable />
        </div>
    );
}

export default MainPage;