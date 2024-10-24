import { Link } from "react-router-dom";
import { useEffect, useRef, useState, RefObject } from "react";
import Navbar from "../components/Navbar";
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { FaCubesStacked } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { VscChecklist } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";

interface Project {
  xata_id: string;
  NAME: string;
  xata_createdat: string;
  teamId: string;
}

interface User {
  email: string;
  name: string;
  role: string[];
  xata_id: string;
}

const Dashboard = () => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<User[]>([]);

  const scrollContainerRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, projectsResponse, tasksResponse, commentsResponse] = 
          await Promise.all([
            fetch("http://localhost:3000/api/v1/users"),
            fetch("http://localhost:3000/api/v1/projects"),
            fetch("http://localhost:3000/api/v1/tasks"),
            fetch("http://localhost:3000/api/v1/comments")
          ]);

        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        if (!projectsResponse.ok) throw new Error('Failed to fetch projects');
        if (!tasksResponse.ok) throw new Error('Failed to fetch tasks');
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');

        const [userData, projectData, taskData] = await Promise.all([
          usersResponse.json(),
          projectsResponse.json(),
          tasksResponse.json()
        ]);

        setUsers(userData.users);
        setProjects(projectData.data);
        setTasks(taskData);

      } catch (error) {
        toast.error(`Error fetching data: ${(error as Error).message}`);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (direction:'up'|'down')=>{

    if (scrollContainerRef.current) {
      const scrollAmount = 100;
      const currentScroll = scrollContainerRef.current.scrollTop;
      const targetScroll = direction === 'up' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }

  }
  return (
    <div className="flex flex-col px-4 pl-0 relative">
      <Toaster position="top-left"></Toaster>
      <Navbar></Navbar>
      <div className="flex gap-x-5 pr-8">
        <div className="sidebar text-white flex flex-col space-y-3 w-1/6">
          <div className="bg-white text-black flex gap-x-3 p-2 justify-start items-center shadow-sm text-base rounded-lg cursor-pointer">
            <HiHome></HiHome>
            <span>Home</span>
          </div>
          <Link
            to={"/tasks"}
            className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer"
          >
            <MdOutlineManageHistory></MdOutlineManageHistory>
            <span>Manage Tasks</span>
          </Link>
          <Link
            to={"/teams"}
            className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer"
          >
            <AiOutlineTeam></AiOutlineTeam>
            <span>Manage Teams</span>
          </Link>
          <Link
            to={"/projects"}
            className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer"
          >
            <FaCubesStacked></FaCubesStacked>
            <span>Manage Projects</span>
          </Link>
          <Link
            to={"/comments"}
            className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer"
          >
            <FaComments />
            <span>View Comments</span>
          </Link>
          <Link
            to={"/notifications"}
            className="hover:bg-white hover:text-black flex gap-x-3 text-white p-2 justify-start items-center shadow-sm text-base rounded-sm cursor-pointer"
          >
            <MdNotificationsActive />
            <span>Notifications</span>
          </Link>
          <div
            onClick={() => setLogoutModal((prev) => !prev)}
            className="hover:bg-white text-lg flex gap-x-3 text-error p-3 justify-start items-center shadow-sm rounded-sm cursor-pointer"
          >
            <IoMdLogOut></IoMdLogOut>
            <span>Logout</span>
          </div>
        </div>
        <div className="w-4/6 flex h-fit flex-wrap p-5 gap-10 justify-center items-center">
          {/* Task Card - Adjusted size and padding */}
          <div className="flex items-center justify-center gap-10 w-64 h-24 rounded-md shadow-md bg-blue text-white p-4">
            <VscChecklist className="text-4xl"></VscChecklist>
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">{tasks.length}</div>
              <div className="text-sm">Tasks</div>
            </div>
          </div>

          {/* Projects Card */}
          <div className="flex items-center justify-center gap-10 w-64 h-24 rounded-md shadow-md bg-white text-blue p-4">
            <GrProjects className="text-4xl"></GrProjects>
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-sm font-light">Projects</div>
            </div>
          </div>

          {/* Users Card */}
          <div className="flex items-center justify-center gap-10 w-64 h-24 rounded-md shadow-md bg-success text-white p-4">
            <FaUsers className="text-4xl"></FaUsers>
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm">Users</div>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="flex items-center justify-center gap-10 w-64 h-24 rounded-md shadow-md bg-error text-white p-4">
            <MdNotificationsActive className="text-4xl"></MdNotificationsActive>
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">56</div>
              <div className="text-sm">Notifications</div>
            </div>
          </div>
        </div>

        <div className="teams bg-card text-black rounded-lg p-2 h-[85vh] relative">
          <h1 className="text-center text-xl text-black">Users</h1>
          <button 
            onClick={() => handleScroll('up')}
            className="absolute top-1 z-50 bg-black bg-opacity-5 rounded-full p-2"
          >
            <IoIosArrowUp className="text-xl text-black" />
          </button>
          <div ref={scrollContainerRef} className="flex flex-col relative h-[98%] pb-8 overflow-scroll scroll-content overflow-x-hidden">
            {users.map((eachUser) => (
              <div key={eachUser.xata_id} className="w-full text-black flex flex-col space-y-2 py-10 border-b pb-2">
                <div className="text-black text-lg font-medium">{eachUser.name}</div>
                <div className="text-blue text-base">{eachUser.email}</div>
                <div className="font-normal text-black">{eachUser.role}</div>
                <div className="font-light text-black">{eachUser.xata_id}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => handleScroll('down')}
            className="absolute z-50 bottom-2 bg-black bg-opacity-5 rounded-full p-2"
          >
            <IoIosArrowDown className="text-xl text-black" />
          </button>
        </div>
      </div>

      {logoutModal && (
        <div className="absolute top-60 left-60 rounded-lg shadow-lg bg-white text-black p-5 w-80 flex justify-center items-center flex-col gap-y-5">
          <h1 className="text-xl font-medium">We see that you leaving</h1>
          <p className="text-base font-light">
            Logging out will put out of the system and you will not be able
            access your services until you login again
          </p>
          <div className="flex justify-between w-full">
            <button
              onClick={() => setLogoutModal((prev) => !prev)}
              className="text-success px-4 bg-white outline p-2 rounded-md outline-1"
            >
              Cancel
            </button>
            <button className="text-error px-4 bg-white outline p-2 rounded-md outline-1">
              Yes Log me Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;