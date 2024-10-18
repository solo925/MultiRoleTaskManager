import { useState } from "react"
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const RegisterUser = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role] = useState('User');
  return (
    <div className="h-screen flex justify-center items-center">
        <form className="m-auto border p-3 w-[450px] my-auto h-fit flex gap-y-8 flex-col items-start justify-start rounded-sm">
            <div className="text-center font-bold w-full text-white text-xl">Register User</div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="username" className="text-white">Username</label>
                <input className="text-base w-full outline-none p-3 text-black" type="text" name="" id="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="email" className="text-white">Email</label>
                <input className="text-base w-full outline-none p-3 text-black" type="email" name="" id="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password" className="text-white">Password</label>
                <input className="text-base w-full outline-none p-3 text-black" type="password" name="" id="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="role" className="text-white">Role</label>
                <input className="text-base w-full outline-none p-3 text-black" readOnly type="text" name="" id="" value={role}/>
            </div>
            <div className="flex justify-between w-full">
                <p className="text-white">Already have an account?</p>
                <Link to="/user/login" className="text-blue">Login here</Link>
            </div>
            <Button text="Register"></Button>
        </form>
    </div>
  )
}

export default RegisterUser