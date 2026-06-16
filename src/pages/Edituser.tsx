import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const Edituser = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id)
    const [firstName, setfirstName] = useState("");
    const [email, setemail] = useState("")
    const [role, setrole] = useState("")
    const [status, setstatus] = useState("")

    useEffect(()=>{

        const localusers = JSON.parse(
            localStorage.getItem("localstorage") || "[]"
        );
        const localUser = localusers.find((user:any)=> user.id === Number(id));

        if(localUser){
            setfirstName(localUser.firstName);
            setemail(localUser.email);
            setrole(localUser.role || "");
            setstatus(localUser.status || "");

            return;
        }

        axios
        .get(`https://dummyjson.com/users/${id}`)
        .then((res)=>{
            setfirstName(res.data.firstName);
            setemail(res.data.email);
            setrole(res.data.role);
            setstatus(res.data.status)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [id]);

    const handleUpdate = async(e : any)=>{
         e.preventDefault();

         try{
            const localusers = JSON.parse(localStorage.getItem("localstorage") || "[]");

         const localUser = localusers.find((user: any)=> user.id === Number(id));

         if(localUser){
            const updatedUsers = localusers.map((user:any)=>
                user.id===Number(id)?{
                ...user, 
                firstName, 
                email, 
                role, 
                status
            }
            :user);
            localStorage.setItem("localstorage", JSON.stringify(updatedUsers));

            navigate(`/userlist/${id}`);

            return;
        }
         const response = await axios.patch(`https://dummyjson.com/users/${id}`,{
                firstName,
                email,
                role,
                status,
            });
            console.log(response.data);

            alert("user updated..");
            navigate(`/userlist/${id}`);
         } catch(error){
            console.log(error);

         }
         
         }
    
    
  return (
    <div>
   <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded bg-amber-300 border border-amber-600    '>
      <h1 className='text-2xl mb-5'>edit user</h1>
      <form onSubmit={handleUpdate}>
        <input type='text' required
        className='border p-2 mb-4 w-full'
        value={firstName}
        onChange={(e)=>setfirstName(e.target.value)}
        />

        <input type='email'  required
        className='border p-2 mb-4 w-full'
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        />


        <select value={role} onChange={(e)=>setrole(e.target.value)}  className='border p-2 mb-4 w-full'>
          <option value="user">User</option>
          <option value="admin">Admin</option>

        </select>

        <select value={status} onChange={(e)=>setstatus(e.target.value)}  className='border p-2 mb-4 w-full'>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>

        </select>

         {/* <input type='text'
        className='border p-2 mb-4 w-full'
        value={phone}
        onChange={(e)=>setphone(e.target.value)}
       />

          <input type='text' 
        className='border p-2 mb-4 w-full'
        value={age}
        onChange={(e)=>setage(e.target.value)}
        /> */}

       
         

        <div className='flex gap-3'>
            <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded' >
                Save
            </button>
             <button type='submit' className='bg-red-500 text-white px-4 py-2 rounded' 
             onClick={()=> navigate(`/userlist/${id}`)}>
                Cancel
            </button>
        </div>

      </form>
    </div>
    </div>
  )
}

export default Edituser
