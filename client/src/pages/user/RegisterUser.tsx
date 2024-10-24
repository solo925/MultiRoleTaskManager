import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role] = useState('TeamMember'); // Default role

  const navigate = useNavigate();

  const registerUser = async (e: FormEvent) => {
    e.preventDefault(); // Prevent form submission default behavior
    
    if(!email || !password || !confirmPassword || !name){
        toast.error("All fields must vbe provided")
        return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, confirmPassword, role })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Error creating user");
        return;
      }

      toast.success("User created successfully");
      localStorage.setItem("USERACCESSTOKEN_tasktracker", data.token);

      // Navigate user to login page
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
      
    } catch (error) {
      toast.error("An error occurred while registering");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster position="top-left" />
      <form
        onSubmit={registerUser}
        className="m-auto shadow-md rounded-md p-3 w-[450px] my-auto h-fit flex gap-y-8 flex-col items-start justify-start"
      >
        <div className="text-center font-bold w-full text-white text-xl">
          Register User
        </div>
        
        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="username" className="text-white">Username</label>
          <input 
            className="text-base w-full outline-none p-3 text-black"
            type="text"
            id="username"
            required
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="email" className="text-white">Email</label>
          <input 
            className="text-base w-full outline-none p-3 text-black"
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="password" className="text-white">Password</label>
          <input 
            className="text-base w-full outline-none p-3 text-black"
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="confirmPassword" className="text-white">Confirm Password</label>
          <input 
            className="text-base w-full outline-none p-3 text-black"
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between w-full">
            <p className="text-white">Already have an account?</p>
            <Link to="/user/login" className="text-blue">Login here</Link>
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 text-white w-full py-2 rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
