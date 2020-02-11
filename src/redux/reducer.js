import { ADD_EMPLOYEE, REMOVE_EMPLOYEE } from '../redux/action-types';

const initialState = {
    employees: []
};

export const EmployeesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_EMPLOYEE:
            if (state.employees.map(e => e.id).includes(action.payload.id)) {
                return state;
            }
            return Object.assign({}, state, {
                employees: state.employees.concat(action.payload)
            })
        case REMOVE_EMPLOYEE:
            return { ...state, employees: state.employees.filter(e => e.id !== action.payload.id) }
        default:
            return state;
    }
};
