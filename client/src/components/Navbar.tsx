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
            <div className="links"></div>
            <ImUser></ImUser>
        </div>
    </div>
  )
}

export default Navbar
