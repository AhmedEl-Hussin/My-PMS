import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/images/PMS 3.png"
import { useForm } from 'react-hook-form';

export default function ChangePassword() {


  const {
    register,
    handleSubmit,
    getValues,
    formState : { errors },
  } = useForm();

  return (
    <>
      <div className= {`Auth-container `}>

        <button className='btn btn-success mt-2 ms-5 '>
          <Link to="/dashboard"  className='text-decoration-none text-white '> 
            <span><i className="fa-solid fa-arrow-left"></i></span> back 
          </Link>
        </button>
        
        

        <div className='imageLogo'>
          <img className='w-100' src= {logo} alt="" />
        </div>

        <div className="mt-3 d-flex justify-content-center align-items-center">
          
          <div className="caption ">

              <form className='form w-75 m-auto mt-4' >
                <p className="text-white">welcome to PMS</p>
                <h2>Change Password</h2>

          {/* ************************* for input old password ***************************** */}
                  <div className='form-group mt- position-relative mt-4'>
                    <label htmlFor="">Old Password </label>
                    <input className= {` inputs py-2`} 
                      placeholder='Enter your Old Password' 
                      type="password" 
                      {...register("oldPassword" , {
                        required : true,
                        pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
                      })}
                    />
  
                    {errors.oldPassword && errors.oldPassword.type === "required" && (
                    <span className='text-danger mt-4'>oldPassword is required</span>
                    )}
  
                    {errors.oldPassword && errors.oldPassword.type === "pattern" && (
                    <span className='text-danger mt-4'>oldPassword must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long</span>
                    )}
                </div>

          {/* ************************* for input new password ***************************** */}
                <div className='form-group mt- position-relative mt-4'>
                    <label htmlFor=""> New Password </label>
                    <input
                      className='inputs py-2' 
                      placeholder=' New Password' 
                      id="password"
                      type="password"
                      {...register("newPassword", {
                      required: "Please Enter New Password",
                      pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
                      })}
                    />
                    
                    {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}

                </div>

          {/* ************************* for input confirm password ***************************** */}
                  <div className='form-group position-relative mt-4'>
                    <label htmlFor="">Confirm New Password</label>
                    <input
                    className='inputs py-2' 
                    placeholder='Confirm New Password' 
                    id="confirmNewPassword"
                    type="password"
                    {...register("confirmNewPassword", {
                        required: "Please confirm your password",
                        validate:{
                          checkNewPassConfirmationHandler:(value)=>{
                            const{newPassword}=getValues();
                            return newPassword === value || "Newpassword and confirmNewPassword doesn't match!!"
                          },                              
                        }
                      })
                    }
                    />

                    {errors.confirmNewPassword&&(<span className="text-danger">{errors.confirmNewPassword?.message}</span>)}

                  </div>


                <div className='form-group text-center mt-4'>
                  <button className=' text-white'> 
                  Change
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
    </>
  )
}
