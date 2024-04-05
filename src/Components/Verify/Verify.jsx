import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import logo from "../../assets/images/PMS 3.png";
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Verify() {

    const {
        register,
        handleSubmit,
        formState : { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isLoding , setIsLoding] =useState(false);
    const {baseUrl} = useContext(AuthContext)

  // ****************** to verify email ********************
    const onSubmit = (data)=> {
        setIsLoding(true)
    
        axios.put(`${baseUrl}/Users/verify` , data)
        
        .then(()=> {   
            navigate("/")
            toast.success("Verification Successful");  
        })
        .catch((error)=> {
            toast.error(error?.response?.data?.message)
        })
        .finally(()=> {
            setIsLoding(false);
        })
    }

    return (
        <>
            <div className="Auth-container">
                <div className='imageLogo  text-center'>
                    <img className='w-100 mt-5' src= {logo} alt="" />
                </div>

                <div className="mt-3 d-flex justify-content-center align-items-center">
                    <div className="caption ">

                    <form className='form w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-white">welcome to PMS</p>
                        <h2>Verify Account</h2>

        {/* ************************* for input email ***************************** */}
                        <div className='form-group mt-2 position-relative mt-4'>
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

        {/* ************************* for OTP code ***************************** */}
                        <div className='form-group mt-2 position-relative mt-4'>
                            <label htmlFor="">OTP Verification</label>
                            <input className=' py-2 text-white inputs' 
                                placeholder= 'Enter Verification' 
                                type="text" 
                                {...register("code" , {
                                    required: true,
                                })}
                            />

                            {errors.code && errors.code.type === "required" && (
                            <span className='text-danger mt-4'>OTP is required</span>
                            )}
                        </div>
                        
                        <div className='form-group text-center mt-4'>
                            <button className=' text-white' type="submit"> 
                                {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "save"}
                            </button>
                        </div>

                    </form>

                    </div>
                </div>
            </div>
        </>
    )
}
