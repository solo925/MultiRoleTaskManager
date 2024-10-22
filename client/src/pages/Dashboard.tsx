import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { IoMdLogOut } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdOutlineManageHistory } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { FaCubesStacked } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaComments } from "react-icons/fa";

interface Project{
  xata_id:string,
  NAME: string;
  xata_createdat:string;
  teamId: string;
}


const Dashboard = () => {
    const [logoutModal,setLogoutModal] = useState<boolean>(false);
    const [projects,setProjects] = useState<Project[]>([]);

    useEffect(()=>{
        const fetchUsers = async () => {
            const response = await fetch ("")
            
        }

    },[])

    useEffect(()=>{
        const fetchProjects = async () => {
            const response = await fetch ("http://localhost:3000/api/v1/projects");
            if (!response.ok) {
                toast.error("Error fetching projects");                
            }else{
                const data = await response.json();
                setProjects(data.data)
            }
            
        }

        fetchProjects();

    },[])
  return (
    <div className="flex flex-col px-4 pl-0 relative">
        <Navbar></Navbar>
        <div className="flex gap-x-10">
            <div className="sidebar text-white flex flex-col space-y-3 w-1/6">
                <div className="bg-white text-black flex gap-x-3 p-2 justify-start items-center shadow-sm text-base rounded-lg cursor-pointer">
                    <HiHome></HiHome>
                    <span>Home</span>
                </div>
                <Link to={"/tasks"} className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer">
                    <MdOutlineManageHistory></MdOutlineManageHistory>
                    <span>Manage Tasks</span>
                </Link>
                <Link to={"/teams"} className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer">
                    <AiOutlineTeam></AiOutlineTeam>
                    <span>Manage Teams</span>
                </Link>
                <Link to={"/projects"} className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer">
                    <FaCubesStacked></FaCubesStacked>
                    <span>Manage Projects</span>
                </Link>
                <Link to={"/comments"} className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer">
                    <FaComments />
                    <span>View Comments</span>
                </Link>
                
                <Link to={"/notifications"} className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer">
                    <MdNotificationsActive />
                    <span>Notifications</span>
                </Link>
                <div onClick={()=>setLogoutModal(prev => !prev)} className="hover:bg-white text-lg flex gap-x-3 text-error p-3 justify-start items-center shadow-sm rounded-sm cursor-pointer">
                    <IoMdLogOut></IoMdLogOut>
                    <span>Logout</span>
                </div>
            </div>
            <div>
                <div>Tasks</div>
                <div>Projects</div>
                <div>Tasks</div>
                <div>Tasks</div>
                <div>Tasks</div>
            </div>
            
            <div className="teams bg-slateGray bg-opacity-15 rounded-lg w-1/6 p-2 h-[85vh]">
                <h1 className="text-center text-xl text-white">Users</h1>
            </div>
        </div>

        {
            logoutModal && (<div className="absolute top-60 left-60 rounded-lg shadow-lg bg-white text-black p-5 w-80 flex justify-center items-center flex-col gap-y-5">
            <h1 className="text-xl font-medium">We see that you leaving</h1>
            <p className="text-base font-light">Logging out will put out of the system and you will not be able access your services until you login again</p>
            <div className="flex justify-between w-full">
                <button onClick={()=>setLogoutModal(prev => !prev)} className="text-success px-4 bg-white outline p-2 rounded-md outline-1">Cancel</button>
                <button className="text-error px-4 bg-white outline p-2 rounded-md outline-1">Yes Log me Out</button>
            </div>
        </div>)
        }
    </div>
  )
}

export default Dashboard
