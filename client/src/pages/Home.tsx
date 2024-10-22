import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 p-8">
        {/* Left Section - Welcome & Illustration */}
        <div className="lg:w-1/2 max-w-2xl">
          {/* Hero Section */}
          <div className="text-left mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Welcome to TaskTracker
            </h1>
            <p className="text-xl text-gray-300">
              Streamline your team's workflow with our powerful task management platform
            </p>
          </div>

          {/* Task Management Illustration */}
          <div>
            <svg 
              viewBox="0 0 400 300" 
              className="w-full max-w-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="400" height="300" fill="#1F2937"/>
              
              {/* Kanban Board Background */}
              <rect x="40" y="40" width="320" height="220" rx="8" fill="#374151"/>
              
              {/* Columns */}
              <g>
                {/* Todo Column */}
                <rect x="50" y="60" width="95" height="190" rx="4" fill="#4B5563"/>
                <text x="75" y="80" fill="white" fontSize="14">TO DO</text>
                {/* Task Cards */}
                <rect x="55" y="90" width="85" height="40" rx="3" fill="#60A5FA"/>
                <rect x="55" y="140" width="85" height="40" rx="3" fill="#60A5FA"/>
                <rect x="55" y="190" width="85" height="40" rx="3" fill="#60A5FA"/>
              </g>
              
              {/* In Progress Column */}
              <g>
                <rect x="152" y="60" width="95" height="190" rx="4" fill="#4B5563"/>
                <text x="165" y="80" fill="white" fontSize="14">IN PROGRESS</text>
                <rect x="157" y="90" width="85" height="40" rx="3" fill="#F59E0B"/>
                <rect x="157" y="140" width="85" height="40" rx="3" fill="#F59E0B"/>
              </g>
              
              {/* Done Column */}
              <g>
                <rect x="254" y="60" width="95" height="190" rx="4" fill="#4B5563"/>
                <text x="280" y="80" fill="white" fontSize="14">DONE</text>
                <rect x="259" y="90" width="85" height="40" rx="3" fill="#34D399"/>
                <rect x="259" y="140" width="85" height="40" rx="3" fill="#34D399"/>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Section - Registration Options */}
        <div className="lg:w-1/2 flex flex-col gap-6 max-w-md">
          {/* Admin Registration */}
          <Link 
            to="/admin/login" 
            className="bg-blue text-white rounded-lg p-6 text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Admin Registration</h2>
            <p className="text-purple-100">
              Register as an admin to manage teams and oversee all projects
            </p>
          </Link>

          {/* Team Member Registration */}
          <Link 
            to="/user/register" 
            className="bg-success text-white rounded-lg p-6 text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Team Member Registration</h2>
            <p className="text-blue-100">
              Join as a team member to collaborate on projects and manage tasks
            </p>
          </Link>
        </div>
      </div>

      {/* Footer - Login Link */}
      <div className="p-4 text-center text-gray-400">
        <p>TaskTracker All Rights Reserved. &copy; 2024</p>
      </div>
    </div>
  )
}

export default Home