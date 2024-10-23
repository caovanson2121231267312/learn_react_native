import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

// Action types
export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

// Fetch users with pagination, filtering, and searching
export const fetchUsers = (page = 1, search = "") => async (dispatch) => {
        try {
            // const response = await api.get(`api/users`, {
            const token = await AsyncStorage.getItem("token");
            const response = await api.get(
                `api/users?page=${page}&search=${search}`,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            console.log(response.data);
            dispatch({
                type: FETCH_USERS,
                payload: response.data,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

// Add a new user
export const addUser = (userData) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (await !token) {
            // dispatch(logout());
            return false;
        }

        const response = await api.post("api/users", userData, {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        });
        // console.log(await response)
        // dispatch({
        //     type: ADD_USER,
        //     payload: response.data,
        // });
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

// Edit an existing user
export const editUser = (id, userData) => async (dispatch) => {
    try {
        const response = await api.put(`/users/${id}`, userData);
        dispatch({
            type: EDIT_USER,
            payload: response.data,
        });
    } catch (error) {
        console.error("Error editing user:", error);
    }
};

// Delete a user
export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.delete(`/users/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: id,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
