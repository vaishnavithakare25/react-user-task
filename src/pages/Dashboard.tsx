import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    // const {user, token} = useAuthStore();
    
    //   console.log(user);
    //   console.log(token);
    const navigate = useNavigate();
    const {user, logout} = useAuthStore();

    const handleLogout = ()=>{
      logout();
      navigate("/login");
    }
  return (
    <div className='flex min-h-screen bg-amber-100'>
      {/* <h1>dashboard</h1> */}
      <div className='w-64 bg-gray-500 p-5 text-white '>
        <h2 className='ml-5 text-2xl underline '>Mini dashboard</h2>
        <button 
        onClick={handleLogout}
        className='mt-130 cursor-pointer w-full rounded bg-red-500 py-2 hover:bg-gray-600'>LogOut</button>

      </div>
     

     <div className='flex flex-1 flex-col bg-black'>
      <div className='flex items-center justify-between border-b bg-white px-6 py-4'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <div>
          Welcome, <span className='font-semibold'>{user?.firstName || "user"}</span>
        </div>

      </div>

      <div className='flex-1 bg-gray-200 p-6'>
        <div className='rounded=lg bg-white p-6 '>
          <h2 className='font-semibold'>Welcome to the Dashboard</h2>

          <button 
          onClick={()=>navigate("/userlist")}
          className='border border-green-500 rounded bg-green-200 text-black p-2 m-2 cursor-pointer hover:bg-green-400'>User's List</button>

        </div>

      </div>

     </div>
      
      
      
    </div>
  )
}

export default Dashboard
