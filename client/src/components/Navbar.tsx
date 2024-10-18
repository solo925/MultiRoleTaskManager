import { MdAddTask } from "react-icons/md";
import { ImUser } from "react-icons/im";

const Navbar = () => {
  return (
    <div className="flex justify-between py-6">
        <div className="flex justify-center items-center space-x-2">
            <MdAddTask className="text-blue text-2xl"></MdAddTask>
            <p className="font-bold text-white text-2xl text-calligraphy">TaskTracker</p>
        </div>
        <div className="flex justify-between">
            <div className="outline shadow-2xl rounded-full p-3 flex justify-center items-center">
             <ImUser className="text-white text-2xl"></ImUser>
            </div>
        </div>
    </div>
  )
}

export default Navbar
