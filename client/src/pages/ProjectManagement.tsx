/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import CreateProject from "../components/CreateProject";

interface ProjectFormData {
  id: string;
  projectName: string;
  teamID: string;
}

interface Project{
  xata_id:string,
  NAME: string;
  xata_createdat:string;
  teamId: string;
}

const ProjectManagement = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);


  const [formData, setFormData] = useState<ProjectFormData>({
    id: "",
    projectName: "",
    teamID: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    // You should send the formData to your backend here.
    // Example code for submitting project data can be added here.
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/projects",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({formData})
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching projects");
        }

        const data = await response.json();
        if (data.data.length < 1) {
          toast.error("No projects found");
        } else {
          setProjects(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchProjects();
  }, []);

  const createTeam = async ()=>{
    const response = await fetch ("http://localhost:3000/api/v1/projects")
    const data = await response.json();
    if (!response.ok) {
      toast.error("Error creating team")
      toast.error(data.message)
    }else{
      toast.success("Project created successfully")
    }
  }

  return (
    <div className="p-8 flex flex-col gap-y-10">
      <Toaster position="top-left" />
      <h1 className="text-white text-center">Project Management</h1>
      <div className="flex flex-wrap justify-evenly gap-10">
        <CreateProject clickFunction={()=>setShowProjectForm(prev => !prev)}></CreateProject>
        {projects.map((eachProject) => (
          <div key={eachProject.xata_id} className="p-5 flex flex-col gap-y-4 text-white w-80  rounded-md shadow-md">
            <div className="text-xl text-success font-medium">Project name: <br /> {eachProject.NAME}</div>
            <div className="text-blue font-light text-base">Team ID: {eachProject.teamId}</div>
            <div className="text-white font-light text-base">Project created at: <br /> {eachProject.xata_createdat}</div>
          </div>
        ))}
      </div>
      {showProjectForm && (
        <form onSubmit={submitData} className="flex flex-col gap-5 w-[450px] absolute top-10 right-10 bg-white p-4 rounded-md shadow-lg">
          <h1 className="text-center text-success font-semibold">Create a new Project</h1>
          <div className="mb-4">
            <label htmlFor="id" className="block text-success text-sm font-medium mb-2">
              Project ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              readOnly
              className="w-full p-2 border text-success rounded focus:outline-none focus:ring-1 focus:ring-success"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="projectName" className="block text-success text-sm font-medium mb-2">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="Name your project"
              className="w-full p-2 border text-success border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-success"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="teamID" className="block text-success text-sm font-medium mb-2">
              Team ID
            </label>
            <textarea
              id="teamID"
              name="teamID"
              value={formData.teamID}
              onChange={handleInputChange}
              className="w-full p-2 border text-success rounded focus:outline-none focus:ring-1 focus:ring-success"
              required
              readOnly
            />
          </div>
          <button onClick={createTeam} className="text-white bg-blue text-sm p-2 px-6">Create Project</button>
        </form>
      )}
    </div>
  );
};

export default ProjectManagement;
