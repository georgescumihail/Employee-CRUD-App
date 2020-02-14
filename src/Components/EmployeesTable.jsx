import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/actions';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './EmployeesTable.css';

const EmployeesTable = () => {

    const [query, setQuery] = useState("");
    const [isData, setIsData] = useState(false);

    const history = useHistory();

    const handleClickedEmployee = id => {
        history.push({
            pathname: "/employees/" + id,
            state: { id: id }
        })
    }

    const filteredEmployees = query =>
        employees.filter(emp => emp.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

    const employees = useSelector(state => state.employees);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://5e4704f8fd1af600145de8f7.mockapi.io/employees")
            .then(res => res.json())
            .then(res => res.map(emp => { dispatch(addEmployee(emp)); setIsData(true); console.log(emp); }));
    }, []);

    let content;

    if (isData) {
        content = <div id="table-area">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees(query).map(emp =>
                        <tr key={emp.id} onClick={() => handleClickedEmployee(emp.id)}>
                            <td>{emp.name}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.age}</td>
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

export default EmployeesTable;