/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

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
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
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

  const createProject = async ()=>{
    const response = await fetch ("http://localhost:3000/api/v1/projects",{
      method:"POST",
      headers:{
        "Content-Type":"applicatio/json"
      },
      body:JSON.stringify({})
    })
    const data = await response.json();
    if (!response.ok) {
      toast.error("Error creating team")
      toast.error(data.message)
    }else{
      toast.success("Project created successfully")
    }
  }

  return (
    <div className="p-8 flex flex-col gap-y-10 bg-slateGray">
      <Toaster position="top-left" />
      <h1 className="text-black font-bold text-2xl text-center">Available Projects</h1>
      <div className="flex flex-wrap justify-evenly gap-10">
        {projects.map((eachProject) => (
          <div key={eachProject.xata_id} className="p-5 flex flex-col gap-y-4 bg-card w-80  rounded-md shadow-2xl">
            <div className="text-xl text-black font-medium">Project name: <br /> {eachProject.NAME}</div>
            <div className="text-success font-light text-base">Team ID: {eachProject.teamId}</div>
            <div className="text-black font-light text-base">Project created at: <br /> {eachProject.xata_createdat}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
