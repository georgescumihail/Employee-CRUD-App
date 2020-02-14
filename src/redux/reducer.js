import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE } from '../redux/action-types';

const initialState = {
    employees: []
};

export const EmployeesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_EMPLOYEE:
            if (state.employees.map(e => e.id).includes(action.payload.id)) {
                return state;
            }
            return {
                employees: [...state.employees, action.payload]
            }
        case REMOVE_EMPLOYEE:
            var filteredList = state.employees.filter(e => e.id !== action.payload.id);
            return {
                employees: filteredList
            }
        case UPDATE_EMPLOYEE:
            return {
                employees: state.employees.map(e =>
                    e.id == action.payload.id ? { id: e.id, name: action.payload.name, salary: action.payload.salary, age: action.payload.age } : e)
            }
        default:
            return state;
    }
};
