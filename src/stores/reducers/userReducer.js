import { FETCH_USERS, ADD_USER, EDIT_USER, DELETE_USER } from '../actions/userActions';

const initialState = {
    users: [],
    totalPages: 1,
    currentPage: 1,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            // console.log(action.payload.data)
            return {
                ...state,
                users: action.payload,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };
        default:
            return state;
    }
};
