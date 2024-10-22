import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast'

interface Task {
  Project: string
  assignedTold: string
  description: string
  dueDate: string
  status: boolean
  xata_createdat: string
  xata_id: string
  xata_updatedat: string
}

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedAssignee, setSelectedAssignee] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<string>("")

  // Unique values for filters
  const uniqueProjects = [...new Set(tasks.map(task => task.Project))]
  const uniqueAssignees = [...new Set(tasks.map(task => task.assignedTold))]

  useEffect(() => {
    fetchTasks()
  }, [])

  // Apply filters whenever filter states change
  useEffect(() => {
    applyFilters()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, selectedProject, selectedAssignee, dateFilter, tasks])

  async function fetchTasks() {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:3000/api/v1/tasks")
      if (!response.ok) {
        toast.error("Error fetching tasks")
        return
      }
      const data = await response.json()
      setTasks(data)
      setFilteredTasks(data)
    } catch (error) {
      toast.error("Failed to fetch tasks")
    } finally {
      setIsLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyFilters = () => {
    let filtered = [...tasks]

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter(task => {
        if (selectedStatus === "completed") return task.status
        return !task.status
      })
    }

    // Filter by project
    if (selectedProject) {
      filtered = filtered.filter(task => task.Project === selectedProject)
    }

    // Filter by assignee
    if (selectedAssignee) {
      filtered = filtered.filter(task => task.assignedTold === selectedAssignee)
    }

    // Filter by due date
    if (dateFilter) {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)

      filtered = filtered.filter(task => {
        const dueDate = new Date(task.dueDate)
        switch (dateFilter) {
          case "today":
            return dueDate.toDateString() === today.toDateString()
          case "tomorrow":
            return dueDate.toDateString() === tomorrow.toDateString()
          case "week":
            return dueDate <= nextWeek && dueDate >= today
          default:
            return true
        }
      })
    }

    setFilteredTasks(filtered)
  }

  if (isLoading) {
    return <div className="text-white text-center p-8">Loading tasks...</div>
  }

  return (
    <div className="grid grid-cols-5 gap-x-5 justify-between items-start p-8 text-white">
      <Toaster position="top-left" />
      <div className="actions col-span-1 flex flex-col gap-y-10">
        <div>
          <h1 className="pb-4 border-b">Filter by status</h1>
          <div className="flex flex-col gap-y-3 mt-4">
            <div className="flex justify-start gap-x-5 items-center">
              <input 
                type="radio" 
                name="status" 
                value="inProgress"
                checked={selectedStatus === "inProgress"}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              <p>In-progress</p>
            </div>
            <div className="flex justify-start gap-x-5 items-center">
              <input 
                type="radio" 
                name="status" 
                value="completed"
                checked={selectedStatus === "completed"}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              <p>Completed</p>
            </div>
            <button 
              onClick={() => setSelectedStatus("")}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear status filter
            </button>
          </div>
        </div>

        <div>
          <h1 className="pb-4 border-b">Filter by project</h1>
          <div className="flex flex-col gap-y-2 mt-4">
            {uniqueProjects.map(project => (
              <div key={project} className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="project"
                  value={project}
                  checked={selectedProject === project}
                  onChange={(e) => setSelectedProject(e.target.value)}
                />
                <label>Project {project}</label>
              </div>
            ))}
            <button 
              onClick={() => setSelectedProject("")}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear project filter
            </button>
          </div>
        </div>

        <div>
          <h1 className="pb-4 border-b">Filter by assignee</h1>
          <div className="flex flex-col gap-y-2 mt-4">
            {uniqueAssignees.map(assignee => (
              <div key={assignee} className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="assignee"
                  value={assignee}
                  checked={selectedAssignee === assignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                />
                <label>User {assignee}</label>
              </div>
            ))}
            <button 
              onClick={() => setSelectedAssignee("")}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear assignee filter
            </button>
          </div>
        </div>

        <div>
          <h1 className="pb-4 border-b">Filter by due date</h1>
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                name="date"
                value="today"
                checked={dateFilter === "today"}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              <label>Due today</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                name="date"
                value="tomorrow"
                checked={dateFilter === "tomorrow"}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              <label>Due tomorrow</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                name="date"
                value="week"
                checked={dateFilter === "week"}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              <label>Due this week</label>
            </div>
            <button 
              onClick={() => setDateFilter("")}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear date filter
            </button>
          </div>
        </div>
      </div>

      <div className="tasks col-span-4 h-[100vh] overscroll-x-none overflow-y-auto p-4 border-x">
        <h1 className="text-white text-center text-xl">Tasks ({filteredTasks.length})</h1>
        <div className="flex flex-wrap gap-10 py-10">
          {filteredTasks.length === 0 ? (
            <div className="w-full text-center text-gray-400">
              No tasks match the selected filters
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.xata_id} 
                className="bg-card flex flex-col gap-y-2 px-6 text-black p-3 rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-xl font-medium">Project ID: {task.Project}</div>
                <div className="text-base font-light">Task ID: {task.xata_id}</div>
                <div className="text-base font-light">Description: {task.description}</div>
                <div className="text-base font-light">Assigned To: {task.assignedTold}</div>
                <div className="text-base font-light">
                  Status: {task.status ? "Completed" : "In Progress"}
                </div>
                <div className="text-base font-light">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>

                <div className="flex gap-x-2">
                  <button className="px-4 p-2 text-sm text-white bg-success">Add comment</button>
                  <button className="px-4 p-2 text-sm text-white bg-black">Change status</button>
                  <button className="px-4 p-2 text-sm text-white bg-error">Delete task</button>
                  <button className="px-4 p-2 text-sm text-white bg-blue">Update task</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>      
    </div>
  )
}

export default TaskBoard