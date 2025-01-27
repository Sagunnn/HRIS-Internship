import React, { useEffect, useState } from 'react'
import { fetchDepartments,createDepartment, deleteDepartmentMain } from '../services/departments'
const Departments = () => {
    const [departmentData,setDepartmentData]= useState([])
    const [newDepartment,setNewDepartment]=useState({
        'department_name':'',
        'department_id':'',
        'manager':'',
    })
    const [showForm, setShowForm]=useState(false)
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
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(newDepartment)
        createDepartment(newDepartment)
        setShowForm(!showForm)
    }
    const handleChange=(e)=>{
        const {name, value}= e.target
        setNewDepartment({...newDepartment,[name]:value})
    }
    const editDepartment=()=>{

    }
    const deleteDepartment= async(deptId)=>{
        try{
            await deleteDepartmentMain(deptId)
        }
        catch(err){
            console.log(err)
        }
    }
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
                    <td><button onClick={()=>editDepartment}>Edit</button></td>
                    <td><button onClick={()=>deleteDepartment(department.id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        <button className="add_department" onClick={()=> setShowForm(!showForm)}>{!showForm? "Create Department":"Cancel"}</button>
        {showForm && (
            <form onSubmit={handleSubmit}>
                <input type="text" name="department_name" placeholder='Department Name'onChange={handleChange}/>
                <input type="text" name="department_id" placeholder='Department ID' onChange={handleChange}/>
                <input type="text" name="manager" placeholder='Manager Name' onChange={handleChange}/>
                <button type="submit">Save</button>
            </form>
        )}
    </div>
  )
}

export default Departments
