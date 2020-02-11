import React, { Component, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { addEmployee } from '../redux/actions';
import { withRouter } from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = props => {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [salary, setSalary] = useState(0);

    const dispatch = useDispatch();

    const handleAdd = () => {
        if (name != "" && age > 18 && salary > 100) {
            fetch("http://dummy.restapiexample.com/api/v1/create", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employee_name: name,
                    employee_age: age,
                    employee_salary: salary,
                    profile_image: ""
                })
            });

            props.history.push("/");
        }
    }

    return (
        <div id="add-employee-container">
            <div id="add-title">Add a new employee:</div>
            <label className="add-label">Name</label>
            <input onChange={e => setName(e.target.value)} className="add-input" type="text" />
            <label className="add-label">Salary</label>
            <input onChange={e => setSalary(e.target.value)} className="add-input" type="number" min="100" />
            <label className="add-label">Age</label>
            <input onChange={e => setAge(e.target.value)} className="add-input" type="number" min="18" />
            <button onClick={() => handleAdd()} id="submit-button">Add Employee</button>
        </div>
    );
}

export default withRouter(AddEmployee);