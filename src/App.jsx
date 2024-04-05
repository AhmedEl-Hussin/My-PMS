import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MasterLayout from './Shared/MasterLayout/MasterLayout'
import NotFound from './Shared/NotFound/NotFound'
import Home from './Components/Home/Home'
import Projects from './Components/Projects/Projects'
import AddNewProject from './Components/AddNewProject/AddNewProject'
import Users from './Components/Users/Users'
import Tasks from './Components/Tasks/Tasks'
import AddNewTask from './Components/AddNewTask/AddNewTask'
import EmployeTask from './Components/EmployeTask/EmployeTask'
import AuthLayout from './Shared/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import Rigester from './Components/Rigester/Rigester'
import RequsetResetPass from './Components/RequsetResetPass/RequsetResetPass'
import RestPassword from './Components/RestPassword/RestPassword'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import ProtectedRouter from './Shared/ProtectedRouter/ProtectedRouter'
import Verify from './Components/Verify/Verify'

function App() {
  
  let {adminData , saveAdminData } = useContext(AuthContext)

  const routes = createBrowserRouter([
    {
      path : "dashboard",
      element : (<ProtectedRouter adminData={adminData} >
                    <MasterLayout adminData = {adminData}/>
                  </ProtectedRouter>),
      errorElement : <NotFound/>,
      children : [
        { index: true, element: <Home/> },
        { path : "projects", element: <Projects/> },
        { path : "projects/addProject", element: <AddNewProject/> },
        { path : "users", element: <Users/> },
        { path : "tasks", element: <Tasks/> },
        { path : "tasks/addTask", element: <AddNewTask/> },
        { path : "tasks/EmployeeTasks", element: <EmployeTask/> },
      ]
    },

    
    {
      path : "/",
      element : <AuthLayout/>,
      errorElement : <NotFound/>,
      children : [
        { index: true, element: <Login saveAdminData = {saveAdminData} /> },
        { path : "login", element: <Login saveAdminData = {saveAdminData} /> },
        { path : "rigester", element: <Rigester/> },
        { path : "requsetRestPass", element: <RequsetResetPass/> },
        { path : "restPassword", element: <RestPassword/> }, 
        { path : "changePassword", element: <ChangePassword/> },
        { path : "verify", element: <Verify/> },
      ]
    }
  ])

  return (
    <>

      <ToastContainer
        theme='colored'
        autoClose={1000}
        position='top-left'
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      <RouterProvider router={routes} />
    </>
  )
}

export default App
