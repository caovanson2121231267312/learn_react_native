import {
    FETCH_SUPPLIER,
    ADD_SUPPLIER,
    EDIT_SUPPLIER,
    DELETE_SUPPLIER,
} from "../actions/supplierActions";

const initialState = {
    suppliers: [],
    totalPages: 1,
    currentPage: 1,
};

export const supplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUPPLIER:
            // console.log(action.payload.data)
            return {
                // ...state,
                suppliers: action.payload,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        default:
            return state;
    }
};
