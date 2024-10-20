/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateTeam from "../components/CreateTeam";
import Button from "../components/Button";
import { useState, ChangeEvent, FormEvent } from "react";

interface TeamFormData {
  teamID: string;
  team_name: string;
  teamDescription: string;
  adminID: string;
}
const TeamManagement = () => {
    const [showTeamForm, setShowTeamForm] = useState<boolean>(false);
    const [displayComponents, setDisplayComponents] = useState([]);
    const [formData,setFormData] = useState<TeamFormData>({
      teamID:"",
      team_name:"",
      teamDescription:"",
      adminID:""
    })

    const handleToggleForm = ()=>{
      setShowTeamForm(prev => !prev);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      const {name,value} = e.target;
      setFormData(prev => ({...prev,[name]:value}));

    }

    const submitData = async (e: FormEvent)=>{
      e.preventDefault()
    }
   


  return (
    <div className="flex flex-col justify-center items-center gap-y-5 p-8 relative">
      <h1 className="text-white">Manage your teams here</h1>
      <div className="flex justify-start items-start">
        <CreateTeam clickFunction={handleToggleForm} />
       {
        displayComponents.map((eachCard,index) => <div key={index}>{eachCard}</div>)
       }

      </div>


      {
        showTeamForm && ( <div onSubmit={submitData} className="flex flex-col gap-5  w-[450px] absolute top-10 left-10 bg-white p-4 rounded-md shadow-lg">
        <h1 className="text-center font-semibold">Create a new Team</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
          TeamID
          </label>
          <input
            type="text"
            id="teamID"
            name="teamID"
            value={formData.teamID}
            readOnly
            className="w-full p-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
          Team Name
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.team_name}
            onChange={handleInputChange}
            placeholder="Name your team"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
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
        <div className="mb-4">
          <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
          Admin ID
          </label>
          <input
            type="text"
            id="teamDescription"
            name="teamDescription"
            value={formData.adminID}
            className="w-full p-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
            aria-readonly
          />
        </div>
        <Button text="Create Team"></Button>
      </div>)
      }

     
    </div>
  )
}

export default TeamManagement
