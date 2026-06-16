import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Userlist from "./pages/Userlist";
import Userdetails from "./pages/Userdetails";
import { Route, Router, Routes, Navigate } from "react-router-dom";
import Adduser from "./pages/Adduser";
import Edituser from "./pages/Edituser";

function App() {
  // return <AppRoutes/>

  return (
    <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>

        <Route path="/login" element={<Login/>}/>

        <Route path="/dashboard" element={<Dashboard/>}/>

        <Route path="/userlist" element={<Userlist/>}/>

        <Route path="/userlist/:id" element={<Userdetails/>}/>

        <Route path="/adduser" element={<Adduser/>}/>

        <Route path="/edituser/:id" element={<Edituser/>}/>

        <Route path="*" element={<NotFound/>}/>

    </Routes>
  )}

export default App;