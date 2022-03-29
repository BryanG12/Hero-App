import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/authContext"

export const PrivateRoute = ({children}) => {

  const { user } = useContext(AuthContext);
  const location = useLocation();

  const path = `${location.pathname}${location.search}`;
  // console.log(path);
  localStorage.setItem('lastPath',path);
  
  return user.logged
    ? children
    :<Navigate to={'/login'} />
}
