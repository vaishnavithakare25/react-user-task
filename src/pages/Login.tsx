import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {login} from "../api/authService"
import {useAuthStore} from "../store/authStore"


const Login = () => {
    // const response = await Login(data);
    // console.log(response);
    const navigate = useNavigate();
   
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [usernameerror, setusernameerror] = useState("")
    const [passworderror, setpassworderror] = useState("")
    const [error, seterror] = useState("")
    const [loading, setloading] = useState(false)

    const loginuser = useAuthStore((state)=>state.login);

    const handlelogin = async(e)=>{
        e.preventDefault();
         seterror("");
         setusername("");
         setpassword("");

         let isvalid = true;

         if(!username.trim()){
            setusernameerror("username is required");
            isvalid=false;
         }

         if(!password.trim()){
            setpassworderror("password is required");
            isvalid=false;
         }else if(password.length<6){
            setpassworderror("password must be atleast 6 digit");
            isvalid= false;
         }
         if(!isvalid) return;

         try{
            setloading(true);
            const response = await login({
                username,
                password,
            });
            loginuser(response);
            navigate("/dashboard");
         }catch(error){
            seterror("invalid username or password")
         } finally{
            setloading(false);
         }

    const response = await login({
        username,
        password,
    });
    console.log(response)
         
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
      <div className="bg-gray-200 p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>

        <form onSubmit={handlelogin}>
          <input
          value={username}
          onChange={(e)=> setusername(e.target.value)}
            type="text"
            placeholder="enter username"
            className="w-full border p-2 mb-3 rounded"
          />
          {usernameerror && (
            <p className='mt-1 text-sm text-red-500'>{usernameerror}</p>
          )}

          <input
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
            type="password"
            placeholder="enter password"
            className="w-full border p-2 mb-4 rounded"
          />

          {passworderror && (
            <p className='mt-1 text-sm text-red-500'>{passworderror}</p>
          )}

          {error && (
            <p className='mt-1 text-sm text-red-500'>{error}</p>
          )}
          

          <button className="w-full bg-blue-300 text-white p-2 rounded hover:bg-blue-500" type="submit"
          disabled={loading}>
            {loading ? "logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    )
}

export default Login
