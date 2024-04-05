import React , { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";



export default function SideBar() {

  const navigate = useNavigate()
  const [isCollapsed , setIsCollapsed] = useState(false);
  let {userRole} = useContext(AuthContext)

  // ******************* to handle close ********************
  const handelToggle = ()=>{
    setIsCollapsed(!isCollapsed);
  }

  const { pathname } = useLocation()


  // ******************* to log out ********************
  const logout = ()=>{
    localStorage.removeItem("userToken");
    navigate("/login")
  }


  return (
    <>
        <div className="sideBar-container ">

        <Sidebar collapsed={isCollapsed} className=" side">

          <Menu>
            <MenuItem  
              className="togel"
              onClick={handelToggle} 
              icon={ isCollapsed ? <i className="fa-solid icon-tolgle-right fa-chevron-right"></i> 
              : <i className="fa-solid icon-tolgle-left fa-chevron-left"></i> }> 
            </MenuItem>

            <MenuItem  
              data-aos-delay="300" data-aos="fade-right"
              className={`${pathname === "/dashboard" ? 'active' : null} iconHover icons`} 
              icon={<i className="fa fa-home"></i>} 
              component={<Link to="/dashboard" />}> 
              Home
            </MenuItem> 

            {userRole == "Manager" ? 
            <MenuItem 
              data-aos-delay="400" data-aos="fade-right"
              className={`${pathname === "/dashboard" ? 'active' : null} iconHover`} 
              icon={<i className="fa-solid fa-users"></i>} 
              component={<Link to="/dashboard/users" />}> 
              Users
            </MenuItem>: "" } 

            <MenuItem 
              data-aos-delay="500" data-aos="fade-right"
              className={`${pathname === "/dashboard" ? 'active' : null} iconHover icons`} 
              icon={ <i className="fa-solid fa-diagram-project"></i> } 
              component={<Link to="/dashboard/projects" />}> 
              Projects
            </MenuItem>

            <MenuItem 
              data-aos-delay="600" data-aos="fade-right"
              className="iconHover"
              icon={<i className="fa-solid fa-tasks"></i>} 
              component={<Link to="/dashboard/tasks" />}> 
              Tasks
            </MenuItem>

            <MenuItem 
              data-aos-delay="700" data-aos="fade-right"
              className="iconHover"
              icon={<i className="fa-solid fa-unlock"></i>} 
              component={<Link to="/changePassword" />
            }> 
              Change Password
            </MenuItem>
          
            <MenuItem 
              data-aos-delay="800" data-aos="fade-right"
              className="iconHover"
              onClick={logout} 
              icon={<i className="fa-solid fa-right-from-bracket"></i>}> 
              Logout
            </MenuItem>
          
          </Menu> 
    
        </Sidebar>
          
      </div>

    </>
  )
}
