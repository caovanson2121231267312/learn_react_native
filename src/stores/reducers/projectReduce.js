import {
    FETCH_PROJECT,
} from "../actions/projectAction";

const initialState = {
    projects: [],
    totalPages: 1,
    currentPage: 1,
};

export const projectReduce = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECT:
            return {
                ...state,
                projects: action.payload,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        default:
            return state;
    }
};
