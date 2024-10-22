import CreateTeam from "../components/CreateTeam";
import toast, { Toaster } from "react-hot-toast";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface TeamFormData {
  team_name: string;
  teamDescription: string;
}

interface Team {
  adminId: string;
  description: string;
  name: string;
  xata_createdat: string;
  xata_id: string;
}

const TeamManagement = () => {
  const [showTeamForm, setShowTeamForm] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [formData, setFormData] = useState<TeamFormData>({
    team_name: "",
    teamDescription: ""
  });

  const handleToggleForm = () => {
    setShowTeamForm((prev) => !prev);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/v1/teams",{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body: JSON.stringify({formData})
    })

    if (!response.ok) {
      toast.error("Error creating team")
    }else{
      toast.success("New team created successfully")
    }
  };

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/teams");
        if (!response.ok) {
          throw new Error("Error fetching teams");
        }

        const data = await response.json();
        console.log(data);
        
        if (data.length < 1) {
          toast.error("No teams found");
        } else {
          setTeams(data); 
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchTeams();
  }, []);


  const joinTeam = async()=>{

  }

  return (
    <div className="flex bg-slateGray flex-col justify-center items-center gap-y-5 p-8 relative">
      <Toaster position="top-left"></Toaster>
      <h1 className="text-black text-2xl mb-10 font-bold">Manage your teams here</h1>
      <div className="flex flex-wrap justify-evenly gap-10">
        <CreateTeam clickFunction={handleToggleForm}></CreateTeam>
        {teams.map((eachTeam) => (
          <div
            key={eachTeam.xata_id}
            className="p-5 flex flex-col gap-y-4 bg-slateGray text-white w-80  rounded-md shadow-2xl"
          >
            <div className="text-xl text-black font-medium">
              Team name: <br /> {eachTeam.name}
            </div>
            <div className="text-black font-light text-base">
              Admin ID: {eachTeam.adminId}
            </div>
            <div className="text-black font-light text-base">
              Team created at: <br /> {eachTeam.xata_createdat}
            </div>

            <div className="flex gap-x-2">
              <button onClick={joinTeam} className="px-4 p-2 bg-card shadow-md rounded-md text-blue cursor-pointer">Join Team</button>
            </div>
          </div>
        ))}
      </div>
     
      {showTeamForm && (
        <form
          onSubmit={submitData}
          className="flex flex-col gap-5 w-[450px] absolute top-10 right-10 bg-white p-4 rounded-md shadow-lg"
        >
          <h1 className="text-center font-semibold">Create a new Team</h1>
          <div className="mb-4">
            <label
              htmlFor="team_name"
              className="block text-black text-sm font-medium mb-2"
            >
              Team Name
            </label>
            <input
              type="text"
              id="team_name"
              name="team_name"
              value={formData.team_name}
              onChange={handleInputChange}
              placeholder="Name your team"
              className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="teamDescription"
              className="block text-black text-sm font-medium mb-2"
            >
              Team Description
            </label>
            <textarea
              id="teamDescription"
              name="teamDescription"
              value={formData.teamDescription}
              onChange={handleInputChange}
              className="w-full p-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required
            />
          </div>         
          <button className="bg-blue text-white w-fit p-2 mx-auto">Create Team</button>
          <button className="bg-blue text-white w-fit p-2 mx-auto">Invite User</button>
          <button className="bg-blue text-white w-fit p-2 mx-auto">Delete Project</button>
          <button className="bg-blue text-white w-fit p-2 mx-auto">Update Project</button>
        </form>
      )}
    </div>
  );
};

export default TeamManagement;
