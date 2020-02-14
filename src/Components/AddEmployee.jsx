import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './AddEmployee.css';
import { addEmployee } from '../redux/actions';

const AddEmployee = () => {

    const [name, setName] = useState("");
    const [salary, setSalary] = useState(0);
    const [age, setAge] = useState(0);
    const [isValid, setIsValid] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const handleAdd = () => {
        if (name != "" && age >= 18 && salary >= 10) {
            setIsValid(true);

            fetch("http://5e4704f8fd1af600145de8f7.mockapi.io/employees", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    salary: salary,
                    age: age
                })
            })
                .then(res => res.json())
                .then(res => {
                    dispatch(addEmployee({
                        id: res.id,
                        name: res.name,
                        salary: res.salary,
                        age: res.age
                    }));
                    history.push("/");
                });

        }
        else {
            setIsValid(false);
        }
    }

    return (
        <div id="add-employee-container">
            <div id="add-title">Add a new employee:</div>
            <label className="add-label">Name</label>
            <input onChange={e => setName(e.target.value)} className="add-input" type="text" />
            <label className="add-label">Salary</label>
            <input onChange={e => setSalary(e.target.value)} className="add-input" type="number" min="1000" />
            <label className="add-label">Age</label>
            <input onChange={e => setAge(e.target.value)} className="add-input" type="number" min="18" />
            <button onClick={() => handleAdd()} id="submit-button">Add Employee</button>
            {!isValid
                && <div className="error-message">One or more fields has invalid data! (Age must be at least 18, salary at least 10)</div>}
        </div>
    );
}

export default AddEmployee;