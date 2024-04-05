import React, { useContext, useState } from 'react'
import logo from "../../assets/images/PMS 3.png";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function RequsetResetPass() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoding , setIsLoding] =useState(false);
  const { baseUrl } = useContext(AuthContext);

  // ****************** to requset rest password ********************
  const onSubmit = (data) => {

    setIsLoding(true)

    axios.post(`${baseUrl}/Users/Reset/Request`, data)

      .then(() => {  
        navigate("/restPassword")
        toast.success("check your email");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoding(false)
      });
  };

  return (
    <>
      <div className="Auth-container">
        
        <div className="imageLogo text-center">
          <img className="w-100 mt-5" src={logo} alt="" />
        </div>
        
        <div className="mt-3 d-flex justify-content-center align-items-center">
          <div className="caption ">
            
            <form className="form w-75 m-auto mt-4" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-white">welcome to PMS</p>
              <h2>Forget Password</h2>

      {/* ************************* for input email ***************************** */}
              <div className="form-group mt-5 position-relative mt-4">
                <label htmlFor="">E-mail</label>
                <input
                  className=" py-2 text-white inputs"
                  placeholder="Enter your E-mail"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <span className="text-danger mt-4">Email is required</span>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger mt-4">invaild email</span>
                )}
              </div> 
                
              <div className="form-group text-center mt-4">
                <button className=" text-white">
                  {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verify"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
