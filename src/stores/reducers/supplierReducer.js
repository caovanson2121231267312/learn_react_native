const initialState = {
    users: [],
    totalPages: 1,
    currentPage: 1,
};

export const supplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SUPPLIER":
            // console.log(action.payload.data)
            return {
                ...state,
                suppliers: action.payload,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        default:
            return state;
    }
};