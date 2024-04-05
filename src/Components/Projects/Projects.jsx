import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NoData from "../../Shared/NoData/NoData";
import noData from "../../assets/images/noData.png"
import { Dropdown, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';


export default function Projects() {

  const navigate = useNavigate();
  const {baseUrl , requstHeaders, userRole}  = useContext(AuthContext);
  const [projectList , setProjectList] = useState([]);
  const [isLoding , setIsLoding] =useState(false);
  const [itemId , setItemId] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [modelState, setModelState] = useState("colse");
  const handleClose = () => setModelState("colse");
  const {
    register,
    handleSubmit,
    setValue,
    formState : { errors },
  } = useForm();


  // *************** to get all projects *****************
  const getAllProjects = (user,pageNo)=>{
    setIsLoding(true)
    axios.get(`${baseUrl}/Project/` , 
    {
      headers: requstHeaders ,
      params: {
        pageSize: 10,
        pageNumber: pageNo,
      },
    })
    .then((response)=>{
      setProjectList(response?.data?.data)
      setArrayOfPages( Array(response?.data?.totalNumberOfPages).fill().map((_, i) => (i + 1)) );

    }).catch((error)=>{
      toast.error(error?.response?.data?.message || "Something went Wrong");

    })
    .finally(()=> {
      setIsLoding(false);
    })
  }

  // *************** to navigate to add new project ***************
  const addNewProject = ()=> {
    navigate("/dashboard/projects/addProject")
  }

  // *************** to show delete model ***************
  const showDeleteModel = (id)=>{
    setItemId(id)
    setModelState("delete-model");
  }

  // *************** to show update model ***************
  const showUpdateModel = (project)=>{
    setItemId(project?.id);
    setValue( "title" , project?.title);
    setValue( "description" , project?.description);
    setModelState("update-model");
  }

  //*************** to delete project *****************
  const deleteProject = ()=> {
    setIsLoding(true);
    
    axios.delete(`${baseUrl}/Project/${itemId}` , 
    {
      headers : requstHeaders
    })
    .then((response)=>{
      handleClose()
      getAllProjects()
      toast.success("Project Deleted Successfuly")
    
    }).catch((error)=>{
      toast.error(error?.response?.data?.message || "Project Not Deleted");

    })
    .finally(()=> {
      setIsLoding(false);
    })
  }

  // *************** to update project *****************
  const updateProject = (data)=> {
    setIsLoding(true);

    axios.put(`${baseUrl}/Project/${itemId}`, data , 
    {
      headers : requstHeaders
    })
    .then((response)=>{
      console.log(response);
      handleClose()
      getAllProjects()
      toast.success("Project Updated Successfuly")
    
    }).catch((error)=>{
      console.log(error);
      toast.error(error?.response?.data?.message || "'Project Not Updated'")
    
    })    
    .finally(()=> {
      setIsLoding(false);
    })
  }

    useEffect( ()=> {
      getAllProjects()
    } , [])


  return (
    <>

    {/* ************* this model to delete project *********** */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body>
            <div className="text-center noData mt-3">
              <img className='w-50' src= {noData} alt="" />
              <h5 className='mt-3'>Delete This Category ?</h5>
              <p>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>

              <div className='text-end mt-5'>
                <button onClick={deleteProject} className='btn text-end border border-danger text-danger'>
                  {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"}
                </button>
              </div>
            </div>
        </Modal.Body>
      </Modal>

    {/* ************* this model to update project *********** */}
      <Modal show={modelState == "update-model"} onHide={handleClose}>
        <Modal.Body>

          <div className='headerModel'>
              <h3 className='ms-3 mt-3 text-center fw-bold'>Update project</h3>
          </div>
          
          <form className='form w-100 m-auto mt-5' onSubmit={handleSubmit(updateProject)}>

            {/* ************** for title input ************ */}
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

                <div className='form-group mt-3 text-center'>
                  <button className='shredBtn w-75 mt-4 fs-4'>  
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Update"}
                  </button>
                </div>
          </form>

        </Modal.Body>
      </Modal>

      {/* **************** to content above table ****************** */}
      <div className=' header d-flex justify-content-between p-4  '>
          <h3> Projects </h3>
          {userRole == "Manager" ? 
            <button onClick={addNewProject} className="shredBtn" > <i className="fa fa-plus"></i> Add New Project </button>
            : ""
          }
      </div>

      <div className='px-4 pb-4'>
        <div className='tableBody table-responsive bg-white pb-4 rounded-3'>
        
          <table className="table table-striped ">

      {/* **************** to head table ****************** */}
            <thead>
              <tr className="">
                <th className="theadTable" scope="col">#</th>
                <th className="theadTable">Title</th>
                <th className="theadTable" scope="col">Description</th>
                <th className="theadTable" scope="col">Date Created</th>
                {userRole == "Manager" ? 
                  <th className='theadTable text-center ' scope="col text-end">Actions</th> : ""
                }

              </tr>
            </thead>
      
      {/* **************** to table body ****************** */}
            <tbody>
              {!isLoding ? (
                <>
                  {projectList?.length > 0 ? (
                    <>
                    {projectList.map((project , index) => (
                    <tr key={project?.id}>
                      <td scope="row"> {index + 1} </td>
                      <td> {project?.title} </td>
                      <td> {project?.description}  </td>     
                      <td> {project?.creationDate.slice( 0 , 10)} </td> 
                      
                    {userRole == "Manager" ? 
                      <td className='text-center'> 
                      
                        <Dropdown>
                          <Dropdown.Toggle className='drop-btn' variant="" id="dropdown-basic">
                            {/* **************** to drop down list **************** */}
                          </Dropdown.Toggle>
                      
                          <Dropdown.Menu>
                      
                            <Dropdown.Item>
                              <button className="actionBtn" onClick={()=> showUpdateModel(project)}>
                                <i className='fa fs-6 text-success fa-edit'></i>
                                <span className='ms-2'>Edit</span>
                              </button>
                            </Dropdown.Item>
                    
                            <Dropdown.Item>
                              <button className="actionBtn" onClick={()=> showDeleteModel(project?.id)}>
                                <i className='fa fs-6 text-danger fa-trash'></i>
                                <span className='ms-2'>Delete</span>
                              </button>
                            </Dropdown.Item>
                    
                          </Dropdown.Menu>
                        </Dropdown>
                        
                      </td> : ""}           
                    </tr>
                    ))}
                  </> ) : (<tr>
                              <td colSpan="6">
                                <NoData />
                              </td>
                            </tr> 
                    )}
                </>
              ) : (<tr>
                    <td colSpan="6">
                      <Loading />
                    </td>
                  </tr> 
                )}
              
          </tbody>
        </table>

          {/* **************** to pagination ****************** */}
            <nav aria-label="...">
              <ul className="pagination pagination-sm d-flex justify-content-center mt-4">
                {arrayOfPages.map((pageNo) => (
                  <>
                    <li onClick={()=>{getAllProjects(pageNo)}}  className="page-item  element-with-pointer pe-auto">
                      <a className="page-link btn-Pagination"  >
                        {pageNo}
                      </a>
                    </li>
                  </>
                ))}
              </ul>
            </nav> 

        </div>
      </div>

    </>
  )
}
