import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FETCH_MATERIAL = "FETCH_MATERIAL";
export const ADD_MATERIAL = "ADD_MATERIAL";
export const EDIT_MATERIAL = "EDIT_MATERIAL";
export const DELETE_MATERIAL = "DELETE_MATERIAL";

export const fetch_materials =
    (page = 1, search = "", phoneNumber = "") =>
    async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await api.get(
                `api/materials?page=${page}&search=${search}&phoneNumber=${phoneNumber}`,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            dispatch({
                type: FETCH_MATERIAL,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
    
export const add_materials = (supplierData) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await api.post("api/materials/store", supplierData, {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        });
    } catch (error) {
        console.log(error);
    }
};

export const delete_materials = (id) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            return false;
        }
        var formData = new FormData();
        formData.append("_method", "delete");

        const response = await api.delete("api/materials/" + id, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        });
    } catch (error) {
        console.log(error);
    }
};
