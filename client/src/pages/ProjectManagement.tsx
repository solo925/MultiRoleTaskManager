/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useState } from "react"
import Button from "../components/Button"

interface ProjectFormData{
    id:string,
    projectName:string,
    teamID:string
}

const ProjectManagement = () => {
    const [showProjectForm,setShowProjectForm] = useState(false);
    const [editProject,setEditProject] = useState(false);

    const [formData,setFormData] = useState<ProjectFormData>({
        id:"",
        projectName:"",
        teamID:""
    })

    const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = e.target;
        setFormData(prev => ({...prev,[name]:value}))
    }

    const submitData = async (e:FormEvent) => {
        e.preventDefault();
    }
  return (
    <div className="p-8">
        <h1 className="text-white text-center">Project Management</h1>
        {
        showProjectForm && ( <div onSubmit={submitData} className="flex flex-col gap-5  w-[450px] absolute top-10 left-10 bg-white p-4 rounded-md shadow-lg">
        <h1 className="text-center font-semibold">Create a new Project</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
          ProjectID
          </label>
          <input
            type="text"
            id="teamID"
            name="teamID"
            value={formData.id}
            readOnly
            aria-readonly
            className="w-full p-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
          Project Name
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="Name your team"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="teamID" className="block text-black text-sm font-medium mb-2">
          Team ID
          </label>
          <textarea
          
            id="teamDescription"
            name="teamDescription"
            value={formData.teamID}
            onChange={handleInputChange}
            className="w-full p-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-readonly
            readOnly
            aria-required
          />
        </div>
        <Button text="Create Project"></Button>
      </div>)
      }

    </div>
  )
}

export default ProjectManagement
