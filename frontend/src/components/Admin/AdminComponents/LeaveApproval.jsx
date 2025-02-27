import React, { useEffect } from 'react'
import { pendingApprovals } from '../../../services/leaveServices'
const LeaveApproval = () => {
    useEffect(()=>{
        const getLeaves = async () =>{
            
            try{
            const data= await pendingApprovals()
            console.log(data)
            return data
            }
            catch(err){
                console.log(err)
            }
        }
        getLeaves()
    },[])
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}

export default LeaveApproval
