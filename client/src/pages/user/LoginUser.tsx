import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginUser = async (e: FormEvent) => {
    e.preventDefault(); // Prevent form submission default behavior

    if(!email || !password){
        toast.error("All fields must vbe provided")
        return
    }


    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Error logging in");
        return;
      }

      toast.success("Login successful");
      
      // Optionally store the token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to user dashboard or home page
      toast.success("User login successful")
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster position="top-left" />
      <form
        onSubmit={loginUser}
        className="m-auto shadow-md rounded-md p-3 w-[450px] my-auto h-fit flex gap-y-8 flex-col items-start justify-start"
      >
        <div className="text-center font-bold w-full text-white text-xl">
          Login User
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

        <div className="flex justify-between w-full">
            <p className="text-white">New Here?</p>
            <Link to="/user/login" className="text-blue">Create an account</Link>
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 text-white w-full py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
