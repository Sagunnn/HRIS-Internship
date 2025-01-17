import React from 'react'
import Logout from '../components/Logout'

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Logout/>
      <a href='/user_registration'>User Registration</a><br></br>
      <a href='users'>Users</a>
    </div>
  )
}

export default HomePage