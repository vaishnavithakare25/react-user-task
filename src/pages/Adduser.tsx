import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Adduser = () => {
    const [firstName, setfirstName] = useState("");
    const [email, setemail] = useState("")
    const [image, setimage] = useState("")
    const [role, setrole] = useState(" ")
    const [status, setstatus] = useState("")
  
    const navigate = useNavigate();

    const handlesubmit = async (e)=>{
         e.preventDefault();

         try{
          const response = await axios.post("https://dummyjson.com/users/add",
            {
              firstName,
              email,
              role,
              status
            }
          );
          const newuser = {
            ...response.data, image, role, status, createdDate: new Date().toLocaleDateString(),
          }
          const localUser = JSON.parse(localStorage.getItem("localusers") || "[]");
          localUser.push(newuser);
          
          localStorage.setItem("localstorage", JSON.stringify(localUser));
          navigate("/userlist");
          console.log("submited")
          
         }

         catch(error){
          console.log(error)
          alert("failed to add user")

         }

          // const newUser = {
          //   id: Date.now(),
          //   firstname,
          //   email,
          // }


    }
  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded bg-amber-300 border border-amber-600    '>
      <h1 className='text-2xl mb-5'>add user</h1>
      <form onSubmit={handlesubmit}>
        <input type='text' placeholder='enter name' required
        className='border p-2 mb-4 w-full'
        value={firstName} onChange={(e)=> setfirstName(e.target.value)}/>

        <input type='email' placeholder='enter email' required
        className='border p-2 mb-4 w-full'
        value={email} onChange={(e)=> setemail(e.target.value)}/>

         <input type='text' placeholder='enter img url..'
        className='border p-2 mb-4 w-full'
        value={image} onChange={(e)=> setimage(e.target.value)}/>
{/* 
          <input type='text' placeholder='enter no.'
        className='border p-2 mb-4 w-full'
        value={phone} onChange={(e)=> setphone(e.target.value)}/> */}

        <select value={role} onChange={(e)=>setrole(e.target.value)}  className='border p-2 mb-4 w-full'>
          <option value="" disabled>Select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>

        </select>

        <select value={status} onChange={(e)=>setstatus(e.target.value)}  className='border p-2 mb-4 w-full'>
          <option value="" disabled>Select status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>

        </select>

        {/* <input type='text' placeholder='enter age.'
        className='border p-2 mb-4 w-full'
        value={age} onChange={(e)=> setage(e.target.value)}/> */}

         

        <div className='flex gap-3'>
            <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded' >
                Save
            </button>
             <button type='submit' className='bg-red-500 text-white px-4 py-2 rounded' 
             onClick={()=> navigate("/userlist")}>
                Cancle
            </button>
        </div>

      </form>
    </div>
  )
}

export default Adduser
