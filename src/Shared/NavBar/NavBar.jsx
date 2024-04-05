import React from 'react'
import navLogo from "../../assets/images/navLogo.png"
import navImg from "../../assets/images/navbarImg.png"



export default function NavBar({adminData}) {
  return (
    <>
      <div className=" px-3 py-1 navbarCaption d-flex justify-content-between ">

        <div className="">
          <img className='navlogo' src={navLogo} alt="" />
        </div>

        <div>
        
        </div>
        <div className=" w-2 d-flex pe-5 ">
          <div className='navbarImg '>
            <img className='navbarImg' src={navImg} alt="" />
          </div>

          <div className='navCaption'>
            <span className='ms-2 fw-bold'> {adminData.userName} </span> <br />
            <span className='navEmail ms-2'> {adminData.userEmail} </span>
          </div>

        </div>

      </div>
    </>
  )
}
