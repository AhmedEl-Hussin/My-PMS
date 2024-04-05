import React from 'react'
import logo from "../../assets/images/PMS 3.png";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';


export default function Login({saveAdminData}) {

  const {
    register,
    handleSubmit,
    formState : { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoding , setIsLoding] =useState(false);
  const {baseUrl} = useContext(AuthContext)


  // ****************** to login **********************
  const onSubmit = (data)=> {
    setIsLoding(true)

    axios.post(`${baseUrl}/Users/Login` , data)

    .then((response)=> {
      localStorage.setItem('userToken', response?.data?.token);
      saveAdminData()
      navigate("/dashboard")
      toast.success(response?.data?.message ||"Successfully")
    })
    .catch((error)=> {
      toast.error(error?.response?.data?.message || "Something went Wrong")
    })
    .finally(()=> {
      setIsLoding(false);
    })
  }


  return (
    <>
      <div className="Auth-container">
        <div className='imageLogo text-center'>
          <img className='w-100 mt-4' src= {logo} alt="" />
        </div>
        <div className="mt-3 d-flex justify-content-center align-items-center">
          
          <div className="caption ">

              <form className='form w-75 m-auto mt-4' onSubmit={handleSubmit(onSubmit)}>
                <p className="text-white">welcome to PMS</p>
                <h2>Log in</h2>

      {/* ************************* for input email ***************************** */}
                <div className='form-group mt-5 position-relative mt-4'>
                    <label htmlFor="">E-mail</label>
                    <input className=' py-2 text-white inputs' 
                      placeholder= 'Enter your E-mail' 
                      type="email" 
                      {...register("email" , {
                        required: true,
                        pattern : /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                      })}
                    />

                  {errors.email && errors.email.type === "required" && (
                  <span className='text-danger mt-4'>Email is required</span>
                  )}

                  {errors.email && errors.email.type === "pattern" && (
                  <span className='text-danger mt-4'>invaild email</span>
                  )}
                </div>

      {/* ************************* for input password ************************* */}
                <div className='form-group mt-4 position-relative'>
                  <label htmlFor="">Password</label>
                  <input className='py-2 text-white inputs' 
                    placeholder='Enter your password' 
                    type="password" 
                    {...register("password" , {
                      required : true,
                      pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
                    })}
                  />

                  {errors.password && errors.password.type === "required" && (
                  <span className='text-danger mt-4'>Password is required</span>
                  )}

                  {errors.password && errors.password.type === "pattern" && (
                  <span className='text-danger mt-4'>Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long</span>
                  )}

                </div>

              <div className="d-flex justify-content-between">
              
                <div className='rigester mt-3 text-end'>
                  <Link to = "/rigester">Register Now ?</Link>
                </div>
                  
                <div className='rigester mt-3 text-end'>
                  <Link to = "/requsetRestPass">Forget Password</Link>
                </div>
              </div>

                <div className='form-group text-center mt-4'>
                  <button className=' text-white'> 
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
                  </button>
                </div>

              </form>
          </div>

          </div>
        </div>
    </>
  )
}
