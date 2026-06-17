import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {login} from "../api/authService"
import {useAuthStore} from "../store/authStore"
import {z} from "zod";

const loginSchema = z.object({
  username: z.string()
              .min(1, "username is requried"),

  password: z.string()
             .min(1, "password is requried")
             .min(6, "passwoed must be at least 6 character")
})


const Login = () => {
    const navigate = useNavigate();
   
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState<{username?: string; password?: string; login?: string;}>({});
    const [loading, setloading] = useState(false)

    const loginuser = useAuthStore((state)=>state.login);

    const handlelogin = async(e)=>{
        e.preventDefault();
         seterror({});
         setusername("");
         setpassword("");

         const result = loginSchema.safeParse({
          username,
          password,
        })
        if(!result.success){
          const failederror = result.error.flatten().fieldErrors;

          seterror({
            username: failederror.username?.[0],
            password: failederror.password?.[0],
          });

          return;
        }


         try{
            setloading(true);
            const response = await login({
                username,
                password,
            });
            loginuser(response);
            navigate("/dashboard");
         }catch(error){
            seterror({login : "invalid username or password"})
         } finally{
            setloading(false);
         }

         
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
        
           {error.username && (
            <p className='text-red-500'>{error.username}</p>
          )}

          <input
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
            type="password"
            placeholder="enter password"
            className="w-full border p-2 mb-4 rounded"
          />

       

          {error.password && (
            <p className='text-red-500'>{error.password}</p>
          )}

           {error.login && (
            <p className='mt-1 text-sm text-red-500'>{error.login}</p>
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
