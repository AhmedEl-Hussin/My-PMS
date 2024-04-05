import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NoData from "../../Shared/NoData/NoData";
import noData from "../../assets/images/noData.png"
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';


export default function Tasks() {

  const navigate = useNavigate();
  const { baseUrl, requstHeaders, userRole } = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [modelState, setModelState] = useState("colse");
  const [usersList, setUsersList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const handleClose = () => setModelState("colse");

  const {
    register,
    handleSubmit,
    setValue,
    formState : { errors },
  } = useForm();


  // *************** to get all tasks *****************
  const getAllTasks = ( pageNo) => {
    setIsLoding(true);
    
      axios.get(`${baseUrl}/Task/manager`, {
        headers: requstHeaders,
        params: {
          pageSize: 10,
          pageNumber: pageNo,
        },
      })

      .then((response) => {
        setTasksList(response?.data?.data);
        setArrayOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_, i) => i + 1));
      })

      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })

      .finally(() => {
        setIsLoding(false);
      })
  };

  // *************** to get all users *****************
  const getAllUsers = () => {

    axios.get(`${baseUrl}/Users/?pageSize=50&pageNumber=1`, {
        headers: requstHeaders,
      })

      .then((response) => {
        setUsersList(response?.data?.data);
      })

      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
  };

  // *************** to get all projects *****************
  const getAllProjects = () => {
    
    axios.get(`${baseUrl}/Project/manager?pageSize=50&pageNumber=1`, 
    {
      headers: requstHeaders,
    })
    .then((response) => {
      setProjectList(response?.data.data);
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message || "Something went Wrong");
    })
  };

  // *************** to show delete model ***************
  const showDeleteModel = (id) => {
    setItemId(id);
    setModelState("delete-model");
  };

  // *************** to show update model ***************
  const showUpdateModel = (task) => {
    setItemId(task?.id);
    setValue("title", task?.title);
    setValue("description", task?.description);
    setValue("employeeId", task?.employee?.id);
    setModelState("update-model");
  };

  // *************** to update task *****************
  const updateTask = (data) => {
    setIsLoding(true);

    axios.put(`${baseUrl}/Task/${itemId}`, data, {
      headers: requstHeaders,
    })

    .then((response) => {
      handleClose();
      getAllTasks(userRole);
      toast.success("Task Updated Successfuly");
    })

    .catch((error) => {
      toast.error(error?.response?.data?.message || "'Task Not Updated'");
    })

    .finally(() => {
      setIsLoding(false);
    })
  };

  //*************** to delete Task *****************
  const deleteTask = () => {
    setIsLoding(true);
  
    axios.delete(`${baseUrl}/Task/${itemId}`, {
      headers: requstHeaders,
    })

    .then((response) => {
      handleClose();
      getAllTasks(userRole);
      toast.success("Task Deleted Successfuly")
    })
    
    .catch((error) => {
      toast.error(error?.response?.data?.message || "Task Not Deleted");
    })

    .finally(() => {
      setIsLoding(false);
    })
  };

  //**************** for navigate to add new task ******************
  const addNewTask = () => {
    navigate("/dashboard/tasks/addTask");
  };
  
  //*************** to check task status (toDo / inProgress / done) ***************
  const taskStatus = (tasksList) => {
    
    if (tasksList.status == "ToDo") {
      return (
        <div className="bg-info text-white w-50 text-center rounded-5">
          <span className="fw-bold"> to do </span>
        </div>
      );

    } else if (tasksList.status == "InProgress") {
      return (
        <div className="shareColor text-white w-75 text-center rounded-5">
          <span className="fw-bold"> in progress </span>
        </div>
      );

    } else if (tasksList.status == "Done") {
      return (
        <div className="bg-success text-white w-50 text-center rounded-5">
          <span className="fw-bold"> done </span>
        </div>
      );
    }
  };


  useEffect(() => {
    getAllTasks();
    getAllUsers();
    getAllProjects();
  
  }, []);0



  return (
    <>
      {userRole == "Manager" ? <>

        {/* ************* this model to delete task *********** */}
          <Modal show={modelState == "delete-model"} onHide={handleClose}>
            <Modal.Body>
                <div className="text-center noData mt-3">
                  <img className='w-50' src= {noData} alt="" />
                  <h5 className='mt-3'>Delete This Category ?</h5>
                  <p>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>

                  <div className='text-end mt-5'>
                    <button onClick={deleteTask} className='btn text-end border border-danger text-danger'>
                      {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"}
                    </button>
                  </div>
                </div>
            </Modal.Body>
          </Modal>

        {/* ************* this model to update task *********** */}
          <Modal show={modelState == "update-model"} onHide={handleClose}>
            <Modal.Body>
              <div className="headerModel">
                <h3 className="ms-3 mt-3 text-center fw-bold">Update Task</h3>
              </div>

              <form className="form w-100 m-auto mt-5" onSubmit={handleSubmit(updateTask)}>

                {/* ************** for title input ************ */}
                <div className="form-group mt-4">
                  <label className='text-warning'>Title</label>
                  <input
                    className="form-control rounded-3 py-2 mt-2"
                    placeholder="Name"
                    type="text"
                    {...register("title", {
                      required: true,
                    })}
                  />
                  {errors.title && errors.title.type === "required" && (
                    <span className="text-danger mt-4">title is required</span>
                  )}
                </div>
                  
                {/* ************** for description input ************ */}
                <div className="form-group mt-4 ">
                  <label className='text-warning'>Description</label>
                  <input
                    className="form-control rounded-3 pb-5 mt-2"
                    placeholder="Description"
                    type="text"
                    {...register("description", {
                      required: true,
                    })}
                  />
                  {errors.description && errors.description.type === "required" && (
                    <span className="text-danger mt-4">
                      description is required
                    </span>
                  )}
                </div>
                  
                {/* ************** to select user **************** */}
                <div className="col-md-12">
                  <div className="form-group mt-3">
                    <label className="pb-2 text-warning">user</label>
                    <select
                      {...register("employeeId", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      className="form-select"
                    >
                      <option value="" className="text-muted">
                        Select user
                      </option>
                      {usersList.map((user, index) => (
                        <option key={index} value={user.id}>
                          {user?.userName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                      
                      
                <div className="form-group mt-3 text-center">
                  <button className="shredBtn w-75 mt-4 fs-4">
                    {isLoding == true ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
                    
              </form>
            </Modal.Body>
          </Modal>
                    
          {/* **************** to content above table ****************** */}
          <div className=' header d-flex justify-content-between p-4  '>
              <h3> Tasks </h3>
              {userRole == "Manager" ? 
                <button onClick={addNewTask} className="shredBtn" > <i className="fa fa-plus"></i> Add New Task </button> : ""
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
                    <th className="theadTable">Statues</th>
                    <th className="theadTable">User</th>
                    <th className="theadTable">Project</th>
                    <th className="theadTable" scope="col">Date Created</th>
                    <th className='theadTable text-center ' scope="col text-end">Actions</th>
                  </tr>
                </thead>
            
          {/* **************** to table body ****************** */}
                <tbody>
                  {!isLoding ? (
                    <>
                      {tasksList?.length > 0 ? (
                        <>
                        {tasksList.map((task , index) => (
                        <tr key={task?.id}>
                          <td scope="row"> {index + 1} </td>
                          <td> {task?.title} </td>
                          <td> {taskStatus(task)}  </td>
                          <td> {task?.employee?.userName}  </td>       
                          <td> {task?.project?.title}  </td>       
                          <td> {task?.creationDate.slice( 0 , 10)} </td> 
                          <td className='text-center'> 
                            {userRole == "Manager" ?  <Dropdown>
                              <Dropdown.Toggle className='drop-btn' variant="" id="dropdown-basic">
                                {/* **************** to drop down list **************** */}
                              </Dropdown.Toggle>
                        
                              <Dropdown.Menu>
                        
                                <Dropdown.Item>
                                  <button className="actionBtn" onClick={()=> showUpdateModel(task)}>
                                    <i className='fa fs-6 text-success fa-edit'></i>
                                    <span className='ms-2'>Edit</span>
                        
                                  </button>
                                </Dropdown.Item>
                        
                                <Dropdown.Item>
                                  <button className="actionBtn" onClick={()=> showDeleteModel(task?.id)}>
                                    <i className='fa fs-6 text-danger fa-trash'></i>
                                    <span className='ms-2'>Delete</span>
                                  </button>
                                </Dropdown.Item>
                        
                              </Dropdown.Menu>
                            </Dropdown> : ""}
                        
                          </td>            
                        </tr>
                        ))}
                      </>) : (<tr>
                        <td colSpan="7">
                          <NoData />
                        </td>
                      </tr> 
                      )}
                    </>
                  ) : (<tr>
                        <td colSpan="7">
                          <Loading />
                        </td>
                      </tr> 
                    )}

              </tbody> 
                  
            </table>
                  
            {/* **************** to pagination ****************** */}
              <nav aria-label="...">
                <ul className="pagination pagination-sm d-flex justify-content-center">
                  {arrayOfPages.map((pageNo) => (
                    <>
                      <li onClick={()=>{getAllTasks(pageNo)}}  className="page-item  element-with-pointer pe-auto">
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
                  
        </> : "Helllo" }
    </>
  )
}
