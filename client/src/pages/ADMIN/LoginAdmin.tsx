import { useState, FormEvent, ChangeEvent } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const LoginAdmin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  

  return (
    <div className="flex justify-center items-center h-screen">
    <form 
      onSubmit={handleSubmit}
      className="max-w-md w-[450px] flex flex-col gap-y-6 mx-auto mt-8 p-6 rounded-sm shadow-md"
    >
      <div className="text-2xl text-center text-white font-bold mb-6">Login Admin</div>
      
      <div className="mb-4">
        <label 
          htmlFor="email" 
          className="block text-white text-sm font-medium mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label 
          htmlFor="password" 
          className="block text-white text-sm font-medium mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white">New Here?</p>
        <Link to="/admin/register" className="text-blue">Create an account</Link>
      </div>
      <Button text="Login"></Button>
    </form>
    </div>
  );
};

export default LoginAdmin;