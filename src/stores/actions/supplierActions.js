import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FETCH_SUPPLIER = "FETCH_SUPPLIER";
export const ADD_SUPPLIER = "ADD_SUPPLIER";
export const EDIT_SUPPLIER = "EDIT_SUPPLIER";
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";

export const fetch_supplier =
    (page = 1, search = "", phoneNumber = "") =>
    async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await api.get(
                `api/suppliers?page=${page}&search=${search}&phoneNumber=${phoneNumber}`,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            dispatch({
                type: FETCH_SUPPLIER,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
export const addSupplier = (supplierData) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return false;
        }
        const response = await api.post("api/suppliers/store", supplierData, {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        });
    } catch (error) {
        console.log(error);
    }
};

export const delete_supplier = (id) => async(dispatch) =>{
    try{
        const token = await AsyncStorage.getItem('token');
        if(!token){
            return false;
        }
        var formData = new FormData();
        formData.append("_method", "delete");

        const response = await api.delete('api/suppliers/' + id, formData,{
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        });

    }catch(error){
        console.log(error)
    }
}
