import React from 'react'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";


export default function AddNewTask() {


    const navigate = useNavigate();
    const {baseUrl , requstHeaders}  = useContext(AuthContext);
    const [isLoding , setIsLoding] = useState(false);
    const [projectList , setProjectList] = useState([]);
    const [usersList , setUsersList] = useState([]);
    const {
        register,
        handleSubmit,
        formState : { errors },
    } = useForm();


    // ****************** to add new project **********************
    const onSubmit = (data)=> {
        setIsLoding(true);

        axios.post(`${baseUrl}/Task` , data ,
        {
            headers : requstHeaders,
        })
        .then((response)=> {
            navigate("/dashboard/tasks")
            toast.success( response?.data?.message || "Added Successfully")
        })
        .catch((error)=> {
            toast.error(error?.response?.data?.message || "Data of task invaild")
        })
        .finally(()=> {
            setIsLoding(false);
        })
    }

    // *************** to get all projects *****************
    const getAllProjects = ()=>{

        axios.get(`${baseUrl}/Project/manager?pageSize=100&pageNumber=1` , 
        {
            headers: requstHeaders ,
        })
        .then((response)=>{
            setProjectList(response?.data.data)
        
        }).catch((error)=>{
            toast.error(error?.response?.data?.message || "Something went Wrong");
        })
        .finally(()=> {
            setIsLoding(false);
        })
    }

    // *************** to get all users *****************
    const getAllUsers = ()=>{

        axios.get(`${baseUrl}/Users/?pageSize=50&pageNumber=1` , 
        {
            headers: requstHeaders ,
        })
        .then((response)=>{
            setUsersList(response?.data.data)

        }).catch((error)=>{
            toast.error(error?.response?.data?.message || "Something went Wrong");

        })
        .finally(()=> {
            setIsLoding(false);
        })
    }

    // *************** if pressing Cancel ****************
    const backToProjects = ()=> {
        navigate("/dashboard/tasks");
    }

    useEffect( ()=> {
        getAllProjects()
        getAllUsers()

    } , [])


    return (
        <>
            <div className="pb-5">
            {/* **************** to content header ****************** */}
            <div className='bg-white header  px-4 py-3 '>
                <Link className="navigate" to = "/dashboard/tasks"> <i className="fa-solid fa-chevron-left"></i> View All Tasks </Link>
                <h3> Add a New Task </h3>
            </div>

            {/* **************** to view form ****************** */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-75 shadow bg-white p-4 m-auto mt-4 rounded-3">

              {/* ************** for title input *************** */}
                <div className='form-group mt-4'>
                    <label className='text-warning'>Title</label>
                    <input className='form-control rounded-3 py-2 mt-2'
                            placeholder= 'Name' 
                            type="text" 
                            {...register("title" , {
                            required: true,
                        })}
                    />

                    {errors.title && errors.title.type === "required" && (
                        <span className='text-danger mt-4'>title is required</span>
                    )}

                </div>

              {/* ************** for description input ************ */}
                <div className='form-group mt-4 '>
                    <label className='text-warning'>Description</label>
                    <input className='form-control rounded-3 pb-5 mt-2'
                            placeholder= 'Description' 
                            type="text" 
                            {...register("description" , {
                            required: true,
                        })}
                    />
                    {errors.description && errors.description.type === "required" && (
                        <span className='text-danger mt-4'>description is required</span>
                    )}
                </div>

                <div className="row">

              {/* ************** to select user **************** */}
                    <div className="col-md-6">
                        <div className='form-group mt-4'>
                            <label className="pb-2 text-warning">user</label>
                            <select 
                            {...register("employeeId" , {required : true , valueAsNumber : true })} className='form-select'>
                                <option value="" className='text-muted'>Select user</option>
                                {usersList.map((user , index)=> (
                                    <option key={index} value={user.id}>
                                        {user?.userName}
                                    </option>
                            ))} 
                            </select>
                        </div>
                    </div>

              {/* ************** to select project **************** */}
                    <div className="col-md-6">
                        <div className='form-group mt-4'>
                            <label className="pb-2 text-warning">project</label>
                            <select 
                            {...register("projectId" , {required : true , valueAsNumber : true })} className='form-select'>
                                <option value="" className='text-muted'>Select project</option>
                                    
                                {projectList.map((project , index)=> (
                                    <option key={index} value={project.id}>
                                    {project?.title}
                                </option>
                                ))} 
                            </select>
                        </div>
                    </div>

                </div>

                    <div className="d-flex justify-content-between mt-5">
                        <button onClick={backToProjects} className="btn border border-2 rounded-4">Cancel</button>
                        <button className="shredBtn">
                            {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Save"}
                        </button>
                    </div>

                </form>

            </div>
        </>
    )
}

