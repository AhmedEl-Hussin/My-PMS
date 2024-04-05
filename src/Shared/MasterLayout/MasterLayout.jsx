import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout({adminData}) {

  return (
    <>
      <NavBar adminData = {adminData} />

      <div className='d-flex'>

        <div className=''>
            <SideBar/>
        </div> 

        <div className='w-100'>

            <div className='bgOutlet'>
                <Outlet/>
            </div>
            
        </div>

      </div>
    </>
  )
}
