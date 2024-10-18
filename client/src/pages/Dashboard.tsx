import Navbar from "../components/Navbar"
import { IoMdLogOut } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { RiPlayListAddFill } from "react-icons/ri";
import { IoPeopleCircle } from "react-icons/io5";
import { MdGroupAdd } from "react-icons/md";


const Dashboard = () => {
  return (
    <div className="flex flex-col px-8">
        <Navbar></Navbar>
        <div className="flex gap-x-10">
            <div className="sidebar text-white flex flex-col space-y-3 w-1/5">
                <div className="hover:bg-white hover:text-black flex gap-x-3 text-white p-3 justify-start items-center shadow-sm text-lg rounded-sm cursor-pointer">
                    <HiHome></HiHome>
                    <span>Home</span>
                </div>
                <div className="hover:bg-white hover:text-black flex gap-x-3 text-white p-3 justify-start items-center shadow-sm text-lg rounded-sm cursor-pointer">
                    <RiPlayListAddFill></RiPlayListAddFill>
                    <span>Create task</span>
                </div>
                <div className="hover:bg-white hover:text-black flex gap-x-3 text-white p-3 justify-start items-center shadow-sm text-lg rounded-sm cursor-pointer">
                    <MdGroupAdd></MdGroupAdd>
                    <span>Create Team</span>
                </div>
                <div className="hover:bg-white hover:text-black flex gap-x-3 text-white p-3 justify-start items-center shadow-sm text-lg rounded-sm cursor-pointer">
                    <IoPeopleCircle />
                    <span>Join team</span>
                </div>
                <div className="hover:bg-white text-lg flex gap-x-3 text-error p-3 justify-start items-center shadow-sm rounded-sm cursor-pointer">
                    <IoMdLogOut></IoMdLogOut>
                    <span>Logout</span>
                </div>
            </div>
            <div className="projects w-3/5 border-x p-2">
                <h1 className="text-center text-xl text-white">Projects</h1>
            </div>
            <div className="teams bg-slateGray bg-opacity-15 rounded-lg w-1/5 p-2">
                <h1 className="text-center text-xl text-white">Teams</h1>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
