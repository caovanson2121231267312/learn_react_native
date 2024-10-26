import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import {supplierReducer} from "./supplierReducer"
import {materialReducer} from "./materialReducer"
import {projectReduce} from "./projectReduce"
import {taskReducer} from "./taskReducer"

export default combineReducers({
    auth: authReducer,
    users: userReducer, // Add the userReducer here
    suppliers: supplierReducer,
    materials: materialReducer,
    projects: projectReduce,
    tasks: taskReducer,
});
