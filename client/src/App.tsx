import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import RegisterAdmin from "./pages/ADMIN/RegisterAdmin"
import RegisterUser from "./pages/user/RegisterUser"
import LoginAdmin from "./pages/ADMIN/LoginAdmin"
import LoginUser from "./pages/user/LoginUser"

const App = () => {
  return (
    <div className="bg-back min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/user/login" element={<LoginUser></LoginUser>}></Route>
          <Route path="/user/register" element={<RegisterUser></RegisterUser>}></Route>
          <Route path="/admin/login" element={<LoginAdmin></LoginAdmin>}></Route>
          <Route path="/admin/register" element={<RegisterAdmin></RegisterAdmin>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
