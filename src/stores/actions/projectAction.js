import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FETCH_PROJECT = "FETCH_PROJECT";
export const ADD_PROJECT = "ADD_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

export const fetch_projects =
    (page = 1, search = "", phoneNumber = "") =>
    async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await api.get(
                `api/projects?page=${page}&search=${search}&phoneNumber=${phoneNumber}`,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            dispatch({
                type: FETCH_PROJECT,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
    
export const add_projects = (data) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            return false;
        }
        // console.log(data)
        // return
        const response = await api.post("api/projects/store", data, {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        });
    } catch (error) {
        console.log(error);
    }
};

export const delete_projects = (id) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            return false;
        }
        var formData = new FormData();
        formData.append("_method", "delete");

        const response = await api.delete("api/projects/" + id, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        });
    } catch (error) {
        console.log(error);
    }
};
