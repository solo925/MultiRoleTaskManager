import { useState } from "react"
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const LoginUser = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
  return (
    <div className="h-screen flex justify-center items-center">
        <form className="m-auto shadow-md p-3 w-[450px] my-auto h-fit flex gap-y-8 flex-col items-start justify-start rounded-md">
            <div className="text-center font-bold w-full text-white text-xl">Login User</div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="email" className="text-white">Email</label>
                <input className="text-base w-full outline-none p-3 text-black" type="email" name="" id="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password" className="text-white">Password</label>
                <input className="text-base w-full outline-none p-3 text-black" type="password" name="" id="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="flex justify-between w-full">
                <p className="text-white">New Here?</p>
                <Link to="/user/register" className="text-blue">Create an account here</Link>
            </div>
            <Button text="Login"></Button>
            {/* <Button text="Login" color="red" hoverTextColor="blue" hoverBgColor="brown"></Button> */}
        </form>
    </div>
  )
}

export default LoginUser