import React, { useContext, useState } from 'react'
import logo from "../../assets/images/PMS 3.png";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Rigester() {

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl } = useContext(AuthContext);

  // ****************** to register ********************
  const onSubmit = (data) => {
    setIsLoding(true);

    axios.post(`${baseUrl}/Users/Register`, data)

      .then((response) => {
        localStorage.setItem("userToken", response?.data?.token);
        navigate("/verify");
        toast.success("Check Your Email");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(()=> {
        setIsLoding(false);
      })
  };


  return (
    
    <>
      <div className="Auth-container">
        
        <div className='imageLogo text-center'>
          <img className='w-100 mt-4' src= {logo} alt="" />
        </div>

        <div className="mt-3  d-flex justify-content-center align-items-center">
          <div className="caption w-75 rounded-5  ">
            
            <form className="form px-5 m-auto mt-2" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-white mt-3">welcome to PMS <br />
              <h2 className={`titleForm`}>Create New Account</h2></p>

              <div className="row">

        {/* ************************* for input Name ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
                  <label htmlFor="">User Name</label>
                  <input
                    className=" py-2 text-white inputs"
                    placeholder="Enter your name"
                    type="text"
                    {...register("userName", {
                      required: true,
                    })}
                  />

                  {errors.userName && errors.userName.type === "required" && (
                    <span className="text-danger mt-4">
                      userName is required
                    </span>
                  )}
                </div>

        {/* ************************* for input email ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
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

        {/* ************************* for input country ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
                  <label htmlFor="">country</label>
                  <input
                    className=" py-2 text-white inputs"
                    placeholder="Enter your country"
                    type="text"
                    {...register("country", {
                      required: true,
                    })}
                  />

                  {errors.country && errors.country.type === "required" && (
                    <span className="text-danger mt-4">
                      country is required
                    </span>
                  )}
                </div>

        {/* ************************* for input Phone Number ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
                  <label htmlFor="">Phone Number</label>
                  <input
                    className=" py-2 text-white inputs"
                    placeholder="Enter your phone number"
                    type="number"
                    {...register("phoneNumber", {
                      required: true,
                    })}
                  />

                  {errors.phoneNumber &&
                    errors.phoneNumber.type === "required" && (
                      <span className="text-danger mt-4">
                        phoneNumber is required
                      </span>
                    )}
                </div>

        {/* ************************* for input password ************************* */}
                <div className="form-group mt-3 position-relative col-md-6">
                  <label htmlFor="">Password</label>
                  <input
                    className="py-2 text-white inputs"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                    })}
                  />

                  {errors.password && errors.password.type === "required" && (
                    <span className="text-danger mt-3">
                      Password is required
                    </span>
                  )}

                  {errors.password && errors.password.type === "pattern" && (
                    <span className="text-danger mt-4">
                      Password must include at least one lowercase letter, one
                      uppercase letter, one digit, one special character, and be
                      at least 6 characters long
                    </span>
                  )}
                </div>

        {/* ************************* for input confirmPassword ************************* */}
                <div className='form-group position-relative col-md-6 mt-3'>
                  <label htmlFor="">Confirm Password</label>
                  <input 
                  className='inputs py-2' 
                  placeholder='Confirm New Password' 
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate:{
                        checkNewPassConfirmationHandler:(value)=>{
                          const{password}=getValues();
                          return password === value || "Newpassword and confirmNewPassword doesn't match!!"
                        },                              
                      }
                    })
                  } />
                  
                  {errors.confirmPassword && (<span className="text-danger">{errors.confirmPassword?.message}</span>)}
                </div>

              </div>

              <div className="form-group text-center w-75 m-auto mt-4 mb-2">
                <button className=" text-white">
                  {isLoading == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
