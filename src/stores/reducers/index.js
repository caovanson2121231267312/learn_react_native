import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import {supplierReducer} from "./supplierReducer"

export default combineReducers({
    auth: authReducer,
    users: userReducer, // Add the userReducer here
    suppliers: supplierReducer,
});
