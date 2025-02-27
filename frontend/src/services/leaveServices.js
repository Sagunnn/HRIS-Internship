import axios from 'axios'
import { getAuthHeaders } from './authorization'

const BASE_URL = "http://127.0.0.1:8000/api/v1"

export const fetchLeaves = async ()=>{
    try
    {
        const response = await axios.get(`${BASE_URL}/leaves/user-leaves/`,{
        headers: getAuthHeaders(),
    })
    console.log(response.data)
    return response.data
    }
    catch(err){
        console.log(err)
    }
}
export const applyLeave = async (formData) => {
    try{
        const response = await axios.post(`${BASE_URL}/leaves/user-leaves/`,formData,{
            headers:getAuthHeaders(),
        })
        console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export const pendingApprovals= async () =>{
    try{
        const resp= await axios.get(`${BASE_URL}/leaves/leave-approval/`,{
            headers: getAuthHeaders()
        })
        return resp.data
    }
    catch(err){
        console.log(err)
    }
}