import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { IoMdLogOut } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { FaCubesStacked } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { VscChecklist } from "react-icons/vsc";
import toast, {Toaster} from "react-hot-toast";

interface Project{
  xata_id:string,
  NAME: string;
  xata_createdat:string;
  teamId: string;
}

interface User{
    email: string,
    name:string,
    role:string[],
    xata_id:string
}

const Dashboard = () => {
    const [logoutModal,setLogoutModal] = useState<boolean>(false);
    const [projects,setProjects] = useState<Project[]>([]);
    const [users,setUsers] = useState<User[]>([]);
    const [tasks,setTasks] = useState<User[]>([]);

    useEffect(()=>{
        const fetchUsers = async () => {
            const response = await fetch ("http://localhost:3000/api/v1/users");
            if (!response.ok) {
                toast.error("Error fetching projects");                
            }else{
                const data = await response.json();
                setUsers(data.users)
            }
            
        }
        fetchUsers();

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

    useEffect(()=>{
        const fetchTasks = async () => {
            const response = await fetch ("http://localhost:3000/api/v1/tasks");
            if (!response.ok) {
                toast.error("Error fetching projects");                
            }else{
                const data = await response.json();
                setTasks(data)
            }
            
        }

        fetchTasks();

    },[])
  return (
    <div className="flex flex-col px-4 pl-0 relative">
        <Toaster position="top-left"></Toaster>
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
            <div className="w-4/6 flex flex-wrap justify-evenly gap-6">
                <div className="flex flex-col justify-center items-center gap-y-10 w-80 rounded-md shadow-md bg-white text-black p-3">
                    <VscChecklist className="text-2xl"></VscChecklist>
                    <div className="text-4xl">{tasks.length}</div>
                    <div>Tasks</div>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-10 w-80 rounded-md shadow-md bg-white text-black p-3">
                    <GrProjects className="text-2xl"></GrProjects>
                    <div className="text-4xl">{projects.length}</div>
                    <div>Projects</div>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-10 w-80 rounded-md shadow-md bg-white text-black p-3">
                    <FaUsers className="text-2xl"></FaUsers>
                    <div className="text-4xl">{users.length}</div>
                    <div>Users</div>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-10 w-80 rounded-md shadow-md bg-white text-black p-3">
                    <MdNotificationsActive className="text-2xl"></MdNotificationsActive>
                    <div className="text-4xl">56</div>
                    <div>Notifications</div>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-10 w-80 rounded-md shadow-md bg-white text-black p-3">
                    <FaComments className="text-2xl"></FaComments>
                    <div className="text-4xl">56</div>
                    <div>Comments</div>
                </div>
            </div>
            
            <div className="teams bg-slateGray bg-opacity-15 rounded-lg w-1/6 p-2 h-[85vh]">
                <h1 className="text-center text-xl text-white">Users</h1>
                <div className="flex flex-col gap-y-5">
                    {
                        users.map(eachUser => <div key={eachUser.xata_id} className="w-full text-white">
                            <div>{eachUser.name}</div>
                            <div>{eachUser.email}</div>
                            <div>{eachUser.role}</div>
                            <div>{eachUser.xata_id}</div>
                        </div>)
                    }
                </div>
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
