import axios from 'axios'


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Userdetails = () => {
    const [userdetails, setuserdetails] = useState<any>(null);
    const [loading, setloading] = useState(true)
  
    const {id} = useParams();
    console.log(id)
    const navigate = useNavigate();

    useEffect(()=>{
        const localusers = JSON.parse(
            localStorage.getItem("localstorage") || "[]"
        );
        const localUser = localusers.find((user:any)=> user.id === Number(id));

        if(localUser){
            setuserdetails(localUser);
            setloading(false)
        }else{
            axios.get(`https://dummyjson.com/users/${id}`)
            .then((res)=>{
                setuserdetails(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                setloading(false);
            })
        }
    }, [id])

   if(loading){
    return (
        <div className='min-h-screen flex items-center justify-center'>
            loading....
        </div>
    )
   }

const handledelete = ()=>{
     const localusers = JSON.parse(
            localStorage.getItem("localstorage") || "[]"
        );
     const user = localusers.filter((user: any)=> user.id !== Number(id));

     localStorage.setItem("localstorage", JSON.stringify(user));

     alert("user deleted");

     navigate("/userlist")

}

    
  return (
    <div className='min-h-screen bg-gray-100'>
<button className='border border-blue-400 bg-blue-200 p-2 m-5 cursor-pointer'
onClick={()=>navigate("/userlist")}
>Back to userlist</button>
       <div className='flex items-center justify-center p-4'>
       
     {userdetails && (
        <div className='bg-white '>
            <img src={userdetails.image || "not found"} className='w-full h-50'/>
            <div className='p-6'>
            <h2 className='text-2xl font-bold '>Name : {userdetails.firstName} {userdetails.lastName}</h2>
            {/* <h2>LastName : {userdetails.lastName}</h2> */}
            <div className='pl-5'>
                <p> Email: {userdetails.email}</p>
                <p> Role: {userdetails.role}</p>
                <p> Status: {userdetails.status || (userdetails.id %2 === 0 ? "Active" : "Inactive")}</p>
                <p> Created date: {userdetails.createdDate || userdetails.birthDate || "NA"}</p>

                {/* <p> Phone: {userdetails.phone}</p> */}
                {/* <h2 className=''>age : {userdetails.age}</h2> */}
                {/* <p>address: {userdetails.address.address}, {userdetails.address.city}</p> */}
            </div>
            </div>          
            
        </div>
     )}
     
    </div>
               <div className='flex items-center justify-center'>
                 <button className='mr-5 border border-blue-300 bg-blue-200 p-2 cursor-pointer rounded-2xl'
                 onClick={()=> navigate(`/edituser/${id}`)}
                 >Edit</button>
                 <button 
                 onClick={handledelete}
                 className='mr-5 border border-blue-300 bg-blue-200 p-2  cursor-pointer rounded-2xl'>Delete</button>
            </div>
</div>
  )

}

export default Userdetails