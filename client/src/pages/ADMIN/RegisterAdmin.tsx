import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterFormProps {}

const RegisterAdmin: React.FC<RegisterFormProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role] = useState<string>("Admin");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Registration attempt:", { username, email, password, role });
  };

  return (
    <div className="h-screen flex justify-center items-center">
    <form 
      onSubmit={handleSubmit}
      className="w-[450px] mx-auto mt-8 p-6 gap-y-6 flex flex-col rounded-lg shadow-md"
    >
      <div className="text-2xl text-center text-white font-bold mb-6">Register Admin</div>
      
      <div className="mb-4">
        <label 
          htmlFor="username" 
          className="block text-white text-sm font-medium mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

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

      <div className="mb-4">
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

      <div className="mb-6">
        <label 
          htmlFor="role" 
          className="block text-white text-sm font-medium mb-2"
        >
          Role
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={role}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 cursor-not-allowed"
        />
      </div>

       <div className="flex justify-between w-full">
                <p className="text-white">Already have an account?</p>
                <Link to="/admin/login" className="text-blue">Login here</Link>
            </div>
            


      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
    </div>
  );
};

export default RegisterAdmin;