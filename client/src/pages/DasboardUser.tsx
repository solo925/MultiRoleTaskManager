import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar"
import { IoMdLogOut } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import toast, {Toaster} from "react-hot-toast";


const DashboardUser = () => {
    const [logoutModal,setLogoutModal] = useState<boolean>(false);
    const logoutUser = ()=>{

    }

    const fetchProjects = async () => {
        const response = await fetch("http://localhost:3000/api/v1/projects");
        if (!response.ok) {
           toast.error("Error fetching projects") 
        }
    }

  return (
    <div className="flex flex-col px-8 relative">
        <Toaster position="top-left"></Toaster>
        <Navbar></Navbar>
        <div className="flex gap-x-10">
            <div className="sidebar text-white flex flex-col space-y-5 w-1/6">
                <div className="border-b border-b-white text-white flex gap-x-3 p-2 justify-start items-center shadow-sm text-base cursor-pointer">
                    <HiHome></HiHome>
                    <span>Home</span>
                </div>
                <Link to={"/tasks/view"} className="hover:bg-white hover:text-black flex gap-x-3 text-white px-2 py-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer">
                    <RiPlayListAddFill></RiPlayListAddFill>
                    <span>View Tasks</span>
                </Link>
                <Link to={"/notifications"} className="hover:bg-white hover:text-black flex gap-x-3 text-white px-2 py-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer">
                    <MdNotificationsActive />
                    <span>Notifications</span>
                </Link>
                <div onClick={()=>setLogoutModal(prev => !prev)} className="hover:bg-white text-base flex gap-x-3 text-error px-2 py-2 justify-start items-center shadow-sm rounded-sm cursor-pointer">
                    <IoMdLogOut></IoMdLogOut>
                    <span>Logout</span>
                </div>
            </div>
            <div className="projects w-4/6 border-x p-2 h-[85vh]">
                <div className="text-white w-full flex justify-end items-center gap-x-3 mb-5 outline-white">
                    <input type="text" name="" id="" placeholder="Search here" className="p-2.5 outline-none px-6 bg-opacity-0 text-black"/>
                    <IoIosSearch className="text-2xl cursor-pointer"/>
                </div>
                <h1 className="text-center text-xl text-white">Projects</h1>

            </div>
            <div className="teams bg-slateGray bg-opacity-15 rounded-lg w-1/6 p-2 h-[85vh]">
                <h1 className="text-center text-xl text-white">Teams</h1>
            </div>
        </div>

        {
            logoutModal && (<div className="absolute top-60 left-60 rounded-lg shadow-lg bg-white text-black p-5 w-80 flex justify-center items-center flex-col gap-y-5">
            <h1 className="text-xl font-medium">We see that you leaving</h1>
            <p className="text-base font-light">Logging out will put out of the system and you will not be able access your services until you login again</p>
            <div className="flex justify-between w-full">
                <button onClick={()=>setLogoutModal(prev => !prev)} className="text-success px-4 bg-white outline p-2 rounded-md outline-1">Cancel</button>
                <button onClick={logoutUser} className="text-error px-4 bg-white outline p-2 rounded-md outline-1">Yes Log me Out</button>
            </div>
        </div>)
        }        
    </div>
  )
}

export default DashboardUser
