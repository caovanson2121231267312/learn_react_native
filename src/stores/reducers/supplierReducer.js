const initialState = {
    users: [],
    totalPages: 1,
    currentPage: 1,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS":
            // console.log(action.payload.data)
            return {
                ...state,
                users: action.payload,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        default:
            return state;
    }
};