import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import RegisterAdmin from "./pages/ADMIN/RegisterAdmin"
import RegisterUser from "./pages/user/RegisterUser"
import LoginAdmin from "./pages/ADMIN/LoginAdmin"
import LoginUser from "./pages/user/LoginUser"
import TeamManagement from "./pages/TeamManagement"
import ProjectManagement from "./pages/ProjectManagement"
import TaskBoard from "./pages/TaskBoard"
import TaskDetails from "./pages/TaskDetails"
import Notifications from "./pages/Notifications"
import Home from "./pages/Home"
import Comments from "./pages/Comments"
import DashboardUser from "./pages/DasboardUser"

const App = () => {
  return (
    <div className="bg-back min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/user" element={<DashboardUser></DashboardUser>}></Route>
          <Route path="/user/login" element={<LoginUser></LoginUser>}></Route>
          <Route path="/user/register" element={<RegisterUser></RegisterUser>}></Route>
          <Route path="/admin/login" element={<LoginAdmin></LoginAdmin>}></Route>
          <Route path="/admin/register" element={<RegisterAdmin></RegisterAdmin>}></Route>

          <Route path="/teams" element={<TeamManagement></TeamManagement>}></Route>
          <Route path="/projects" element={<ProjectManagement></ProjectManagement>}></Route>
          <Route path="/tasks" element={<TaskBoard></TaskBoard>}></Route>
          <Route path="/tasks/view" element={<TaskDetails></TaskDetails>}></Route>
          <Route path="/notifications" element={<Notifications></Notifications>}></Route>
          <Route path="/comments" element={<Comments></Comments>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
