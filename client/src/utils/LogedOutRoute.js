import {useContext} from 'react';
import AuthContext from "../context/AuthContext";

const LogedOutRoute = ({children}) => {
  let {user} = useContext(AuthContext)
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !user&&children
}

export default LogedOutRoute;