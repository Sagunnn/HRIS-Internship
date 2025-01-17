import axios from "axios";
import { getAuthHeaders } from "./authorization";
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const fetchDepartments= async () =>{
    try{
        const response = await axios.get(`${API_BASE_URL}/departments/`,{
            headers: getAuthHeaders()
        })
        return response.data
    }
    catch (err){
        console.log(err.response? err.response.data: err.message,'There was an error')
        return null
    }
}