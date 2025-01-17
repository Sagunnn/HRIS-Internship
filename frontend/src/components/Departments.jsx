import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../services/departments'
const Departments = () => {
    const [departmentData,setDepartmentData]= useState([])

    useEffect(()=>{
        const getDepartment= async () =>{
        try{
                const data= await fetchDepartments()
                setDepartmentData(data)
                return data
            }
        catch (err){
            console.log("There was an error fetching the department data", err.response? error.data: error.message)
            return null
        }
    }
    getDepartment()
    },[])
    
  return (
    <div>
        <table>
            <thead>
            <tr>
                <th>Department Name</th>
                <th>Department ID</th>
                <th>Manager</th>
            </tr>
            </thead>
            <tbody>
            {departmentData.map((department)=>(
                <tr key={department.id}>
                    <td>{department.department_name}</td>
                    <td>{department.department_id}</td>
                    <td>{department.manager? department.manager : "NULL"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default Departments
