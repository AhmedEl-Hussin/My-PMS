import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react" ;

export let AuthContext = createContext(null)

export default function AuthContextProvider(props){


    // ******************* to baseUrl for apis *******************
    const baseUrl = `https://upskilling-egypt.com:3003/api/v1`;

    const requstHeaders = { 
        Authorization : `Bearer ${localStorage.getItem("userToken")}`,
    }
    
    // ******************* to decoded token *******************
    const [adminData , setAdminData] = useState(()=> localStorage.getItem("userToken"));
    const [userRole , setUserRole] = useState(null)

    const saveAdminData = ()=> {
        const encodedToken = localStorage.getItem("userToken");
        try{
            const decodedToken = jwtDecode(encodedToken);
            setUserRole(decodedToken.userGroup);            
            setAdminData(decodedToken)
        }catch (error){
            setAdminData(null)
        }
    }
    
    useEffect( ()=> {
        if (localStorage.getItem("userToken")) {
            saveAdminData()
        }
    } , [])

    return (  <AuthContext.Provider value= {{adminData , requstHeaders , userRole, saveAdminData  , baseUrl }} > 
                {props.children} 
            </AuthContext.Provider>)

}