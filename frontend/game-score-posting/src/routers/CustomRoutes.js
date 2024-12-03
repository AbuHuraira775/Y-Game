import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../store/auth"

const PrivateRoute = ()=>{
  const {isLoggedIn} = useAuth()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export  {PrivateRoute}