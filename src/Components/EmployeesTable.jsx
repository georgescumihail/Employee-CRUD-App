import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/actions';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './EmployeesTable.css';

const EmployeesTable = props => {

    const [query, setQuery] = useState("");
    const [isData, setIsData] = useState(false);

    const handleClickedEmployee = id => {
        props.history.push({
            pathname: "/employees/" + id,
            state: { id: id }
        })
    }

    const filteredEmployees = query =>
        employees.filter(emp => emp.employee_name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

    const employees = useSelector(state => state.employees);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://dummy.restapiexample.com/api/v1/employees")
            .then(res => res.json())
            .then(res => res.data.map(emp => dispatch(addEmployee(emp))));

        employees.length > 0 ? setIsData(true) : setIsData(false);

    }, [employees.length]);

    let content;

    if (isData) {
        content = <div id="table-area">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees(query).map(emp =>
                        <tr key={emp.id} onClick={() => handleClickedEmployee(emp.id)}>
                            <td>{emp.id}</td>
                            <td>{emp.employee_name}</td>
                            <td>{emp.employee_salary}</td>
                            <td>{emp.employee_age}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    }
    else {
        content = <div>There is no data available</div>
    }

    return (
        <div id="table-container">
            <input onChange={e => setQuery(e.target.value)} id="table-search" type="text" placeholder="Search" />
            {content}
        </div >

    );
}

export default withRouter(EmployeesTable);