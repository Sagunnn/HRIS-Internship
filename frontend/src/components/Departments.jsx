import React, { useEffect, useState } from 'react'
import { fetchDepartments,createDepartment, deleteDepartmentMain,editDepartmentMain } from '../services/departments'
const Departments = () => {
    const [departmentData,setDepartmentData]= useState([])
    const [newDepartment,setNewDepartment]=useState({
        'department_name':'',
        'department_id':'',
        'manager':'',
    })
    const [showForm, setShowForm]=useState(false)
    const [editDepartmentForm,setEditDepartmentForm]=useState(null)
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
    const editDepartment=(department)=>{
        setEditDepartmentForm({...department})
    }
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setEditDepartmentForm({...editDepartmentForm,[name]:value})
    }
    const handleSaveClick=async ()=>{
        try{
            const updatedDepartment= await editDepartmentMain(editDepartmentForm.id,editDepartmentForm)
        }
        catch{
            console.log("Failed to update department")
        }
    }
    const deleteDepartment= async(deptId)=>{
        try{
            await deleteDepartmentMain(deptId)
        }
        catch(err){
            console.log(err)
        }
    }
    const handleCancelClick=()=>{
        setEditDepartmentForm(null)
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
                    {editDepartmentForm && editDepartmentForm.id===department.id?(
                        <>       
                        <td><input onChange={handleInputChange} type="text" name="department_id" value={editDepartmentForm.department_id} placeholder='Department ID'/></td>
                        <td><input onChange={handleInputChange} type="text" name="department_name" value={editDepartmentForm.department_name} placeholder='Department Name' /></td>
                        <td><input onChange={handleInputChange} type="text" name="manager" value={editDepartmentForm.manager || ""} placeholder='Manager Name' /></td>
                        <td><button type="button" onClick={handleSaveClick}>Save</button></td>
                        <td><button type="button" onClick={handleCancelClick}>Cancel</button></td>
                        </>
                    ):(
                     <>
                    <td>{department.department_name}</td>
                    <td>{department.department_id}</td>
                    <td>{department.manager? department.manager : "NULL"}</td>
                    <td><button onClick={()=>editDepartment(department)}>Edit</button></td>
                    <td><button onClick={()=>deleteDepartment(department.id)}>Delete</button></td>
                    </>
                    )
                    }
                    
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
                <button type="submit">Create</button>
            </form>
        )}
    </div>
  )
}

export default Departments
