import {
    FETCH_SUPPLIER,
    ADD_SUPPLIER,
    EDIT_SUPPLIER,
    DELETE_SUPPLIER,
} from "../actions/supplierActions";

const initialState = {
    materials: [],
    totalPages: 1,
    currentPage: 1,
};

export const supplierMaterial = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUPPLIER:
            // console.log(action.payload.data)
            return {
                // ...state,
                materials: action.payload,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        default:
            return state;
    }
};
