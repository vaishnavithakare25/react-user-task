import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("")
    const [sort, setsort] = useState("")
  const navigate = useNavigate();
  const limit = 6;

      useEffect(() => {
    
     const fetchUsers = async () => {
      try {
        setloading(true);
        let response;
        if(search.trim()){
            response = await axios.get(`https://dummyjson.com/users/search?q=${search}`);
        } else{
            const skip = (page -1)* limit;
            response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);

        }
        
        // const data: ApiResponse = await res.json();

        const localUser = JSON.parse(localStorage.getItem("localstorage") || "[]");
        console.log(localUser)
        setUsers([...response.data.users, ...localUser]);
      } catch (error) {
        console.error(error);
      }finally{
        setloading(false)
      }
    };

    fetchUsers();
  }, [page, search]);

const sortusers = [...users]
if(sort === "asc"){
  sortusers.sort((a,b)=> a.firstName.localeCompare(b.firstName));
}

if(sort === "desc"){
  sortusers.sort((a,b)=> b.firstName.localeCompare(a.firstName));
}

  return (
    <div className="p-5">
        <div className="flex items-center justify-between">
        <button 
        onClick={()=>navigate("/dashboard")}
        className="border border-blue-200  p-2 bg-blue-300 cursor-pointer rounded-2xl">Go to dashboard</button>

        <button 
        onClick={()=>navigate("/adduser")}
        className="border border-blue-200  p-2 bg-blue-300 cursor-pointer rounded-2xl">Add user</button>

        </div>
      <h1 className="flex items-center justify-center m-2 text-3xl">User List</h1>

      <div className="mb-6 flex justify-center gap-2">
        <input type="text" placeholder="serach"
        value={search} onChange={(e)=> setsearch(e.target.value)}
        className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2"/>

        <select 
        value={sort} onChange={(e)=> setsort(e.target.value)}
        className=" max-w-md rounded-lg border border-gray-300 px-4 py-2">
          <option value="">Sort</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
            <p className="text-xl">Loading</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortusers.map((user)=>(
                <div key={user.id} onClick={() => navigate(`/userlist/${user.id}`)}
                className="rounded-lg bg-pink-100 p-5 border border-black "
                >
                    <h2 className="text-center text-xl font-semibold">{user.firstName || user.firstName}</h2>
                    <p className="mt-2 text-center text-gray-600">emial: {user.email}</p>
                    <p className="mt-2 text-center text-gray-600">role: {user.role}</p>
                    <p className="mt-2 text-center text-gray-600">status: {user.status || (user.id %2 === 0 ? "Active" : "Inactive")}</p>
                    <p className="mt-2 text-center text-gray-600">created: {user.createdDate || user.birthDate || "NA"}</p>
                    {/* <p className="mt-2 text-center text-gray-600">address: {user.address.address}, {user.address.city}</p> */}
                  
                </div>
            ))}

        </div>
        
      )}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={()=>setpage(page-1)} disabled={page===1}
        className="rounded bg-gray-500 px-4 py-2 text-white disabled:bg-gray-300">Previous</button>

        <p className="font-medium">Page {page}</p>

        <button onClick={()=>setpage(page+1)} 
        className="rounded bg-gray-500 px-4 py-2 text-white disabled:bg-gray-300">Next</button>

      </div>
      
    </div>
  );
};

export default Users;