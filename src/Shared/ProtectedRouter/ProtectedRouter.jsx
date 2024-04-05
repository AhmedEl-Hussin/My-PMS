import React from 'react'
import { Navigate } from "react-router-dom"


export default function ProtectedRouter({adminData , children}) {
    
    if (adminData == null && !localStorage.getItem("adminToken")) {
        console.log(adminData);
        return <Navigate to = "/login"/>
    }else{
        return children
    }
}
