import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import './EmployeePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeEmployee, updateEmployee } from '../redux/actions';

const EmployeePage = () => {

    const [employee, setEmployee] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [areFieldsLoaded, setAreFieldsLoaded] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const [nameFieldValue, setNameFieldValue] = useState();
    const [salaryFieldValue, setSalaryFieldValue] = useState();
    const [ageFieldValue, setAgeFieldValue] = useState();

    const location = useLocation();
    const id = location.state.id;

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isDataLoaded) {
            fetch(`http://5e4704f8fd1af600145de8f7.mockapi.io/employees/${id}`)
                .then(res => res.json())
                .then(res => setEmployee(res), setIsDataLoaded(true));
        }
    }, [employee]);

    const handleUpdate = async () => {
        if (nameFieldValue != "" && salaryFieldValue >= 10 && ageFieldValue >= 18) {
            setIsValid(true);
            await fetch(`http://5e4704f8fd1af600145de8f7.mockapi.io/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameFieldValue,
                    salary: salaryFieldValue,
                    age: ageFieldValue
                })
            })
                .then(() => {
                    dispatch(updateEmployee({
                        id: id,
                        name: nameFieldValue,
                        salary: salaryFieldValue,
                        age: ageFieldValue
                    }));
                    history.push("/");
                });
        }
        else {
            setIsValid(false);
        }
    }

    const handleDelete = () => {
        fetch(`http://5e4704f8fd1af600145de8f7.mockapi.io/employees/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                dispatch(removeEmployee({
                    id: id
                }));
                history.push("/");
            });
    }

    const setFieldFalues = () => {
        if (employee != null) {
            if (!areFieldsLoaded) {
                setNameFieldValue(employee.name);
                setSalaryFieldValue(employee.salary);
                setAgeFieldValue(employee.age);
                setAreFieldsLoaded(true)
                return true;
            }
            return true;
        }
        return false;
    }


    return (
        <div id="employee-details-container">
            {setFieldFalues() &&
                <div>
                    <div id="employee-title">Employee details:</div>
                    <div className="employee-label">Employee ID: {id}</div>
                    <label className="employee-label">Name</label>
                    <input onChange={e => setNameFieldValue(e.target.value)} className="employee-input" type="text" value={nameFieldValue} />
                    <label className="employee-label">Salary</label>
                    <input onChange={e => setSalaryFieldValue(e.target.value)} className="employee-input" type="number" min="1000" value={salaryFieldValue} />
                    <label className="employee-label">Age</label>
                    <input onChange={e => setAgeFieldValue(e.target.value)} className="employee-input" type="number" min="18" value={ageFieldValue} />
                    <button onClick={handleUpdate} id="update-button">Update Employee</button>
                    <button onClick={handleDelete} id="delete-button">Delete Employee</button>
                    {!isValid
                        && <div className="error-message">One or more fields has invalid data! (Age must be at least 18, salary at least 10)</div>}
                </div>
            }
        </div>
    );
}

export default EmployeePage;