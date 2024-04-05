import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { toast } from 'react-toastify'
import Loading from '../../Shared/Loading/Loading';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal } from 'react-bootstrap';
import avatar from "../../assets/images/avatar.png"
import { useNavigate } from 'react-router-dom';
import NoData from '../../Shared/NoData/NoData';



export default function Users() {

  const {baseUrl , requstHeaders , userRole}  = useContext(AuthContext);
  const [usersList , setUsersList] = useState([]);
  const navigate = useNavigate();
  const [isLoding , setIsLoding] =useState(false);
  const [userId , setUserId] = useState(0);
  const [modelState, setModelState] = useState("colse");
  const [userDetails , setUserDetails] = useState({});
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const handleClose = () => setModelState("colse");


  // *************** to view detail of user *****************
  const showViewModel = (id)=>{
    setUserId(id)
    setModelState("view-model")
    getUserDetails(id)
  }

  // *************** to get all users *****************
  const getAllUsers = (pageNo)=>{
    setIsLoding(true)
    axios.get(`${baseUrl}/Users/` , 
    {
      headers: requstHeaders ,
      params: {
        pageSize: 10,
        pageNumber: pageNo,
      },
    })
    .then((response)=>{
      setUsersList(response?.data?.data)
      setArrayOfPages( Array(response?.data?.totalNumberOfPages).fill().map((_, i) => (i + 1)) );

    }).catch((error)=>{
      toast.error(error?.response?.data?.message || "Something went Wrong");
    })
    .finally(()=> {
      setIsLoding(false);
    })
  }

  // *************** to get user details *****************
  const getUserDetails = (id)=>{

    axios.get( `${baseUrl}/Users/${userId}` , 
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      setUserDetails(response?.data);
    
    }).catch((error)=>{
      error(error?.response?.data?.message || "Not Found Tag Ids")
    })
  }

  // *************** to toggle active user *****************
  const toggleUser = (id)=> {
    setIsLoding(true);

    axios.put(`${baseUrl}/Users/${id}` , {id} ,
    {
      headers : requstHeaders
    })
    .then((response)=>{
      console.log(response);
      getAllUsers()
      toast.success(response?.data?.message)
    
    }).catch((error)=>{
      toast.error(error?.response?.data?.message || "User not blocked");
    })
    .finally(()=> {
      setIsLoding(false);
    })
  }

  useEffect( ()=> {
    getAllUsers()
  } , [])


  return (
    
      <>

      {/* ************* this model to view recipe *********** */}
        <Modal show={modelState == "view-model"} onHide={handleClose}>
          <Modal.Body>
            <h3 className='ms- mt-3 text-success fw-bold'>User Details</h3>
            <div className="w-50 text-center m-auto mt-4">
              {userDetails?.imagePath ?
                <img className="w-75" src={`https://upskilling-egypt.com:3003/`+userDetails.imagePath} alt="" />
                : <img className="w-75" src={avatar} alt="" />        
              }
            </div>
            
            <div className='mt-4 userDetails'>
              <h6 className="mt-4 pb-2 fs-4"> <span className='text-success fs-6'>User Name : </span> {userDetails?.userName}  </h6>
              <h6 className="fs-4 pb-2"> <span className='fs-6 text-success'>Role : </span> {userDetails?.group?.name} </h6>
              <h6 className="fs-4 pb-2"> <span className='fs-6 text-success'>Email : </span> {userDetails?.email}  </h6>
              <h6 className="fs-4 pb-2"> <span className='fs-6 text-success'>Phone Number : </span> {userDetails?.phoneNumber} </h6>
            </div>
            
          </Modal.Body>
        </Modal>

      {/* **************** to content above table ****************** */}
        <div className='bg-white header d-flex justify-content-between p-4 '>
            <h3> Users </h3>
        </div>
              
      {/* **************** to display table ****************** */}
        <div className='px-4 pb-4'>

          <div className='tableBody table-responsive bg-white pb-4 mt-4 rounded-3'>
              
          <table className="table table-striped ">
              
              <thead className=''>
                <tr className="">
                  <th className="theadTable" scope="col">#</th>
                  <th className="theadTable">User name</th>
                  <th className="theadTable" scope="col">Statues</th>
                  <th className="theadTable" scope="col">Phone Number</th>
                  <th className="theadTable" scope="col">Email</th>
                  <th className='theadTable text-center ' scope="col text-end">Actions</th>
                </tr>
              </thead>
              
            <tbody>
              
              {!isLoding ? (
                <>
                  {usersList?.length > 0 ? (
                    <>
                      {usersList.map((user , index)=> 
                        <tr key={user?.id}>
                          <td scope="row"> {index + 1} </td>
                          <td> {user?.userName} </td>
                          <td> {user?.isActivated ? 

                            <div className="bg-success text-white w-75 text-center rounded-5"> 
                              <span> Active </span> 
                            </div>
                            :
                            <div className="bg-danger text-white text-center rounded-5"> 
                              <span> Not Active </span> 
                            </div>}  
                          
                          </td>       
                          <td> {user.phoneNumber} </td>    
                          <td> {user.email} </td>    
                          <td className='text-center'> 
                          <Dropdown>
                            <Dropdown.Toggle className='drop-btn' variant="" id="dropdown-basic">
                              {/* **************** to drop down list **************** */}
                            </Dropdown.Toggle>
                          
                            <Dropdown.Menu>

                              <Dropdown.Item>
                                {user?.isActivated ?
                                  <button onClick={()=> toggleUser(user?.id)} className="btn btn-success"> Block </button>
                                : <button onClick={()=> toggleUser(user?.id)} className="btn btn-danger "> Un Block </button>                
                                }
                              </Dropdown.Item>
                              
                              <Dropdown.Item>
                                <button onClick={()=> showViewModel(user.id)} className="actionBtn" >
                                  <i className='fa fs-6 text-success fa-eye'></i>
                                  <span className='ms-2'>View</span>
                                </button>
                              </Dropdown.Item>
                              
                            </Dropdown.Menu>
                          </Dropdown> 
                          </td>            
                        </tr>
                      )}
                    </>) : (<tr>
                              <td colSpan="6">
                                <NoData />
                              </td>
                            </tr> 
                    )}
                </>
                ):(<tr>
                    <td colSpan="6">
                      <Loading/>
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
                    <li onClick={()=>{getAllUsers(pageNo)}}  className="page-item  element-with-pointer pe-auto">
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
