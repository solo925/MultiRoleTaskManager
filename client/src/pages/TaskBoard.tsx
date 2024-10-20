const TaskBoard = () => {
  return (
    <div className="grid grid-cols-5 gap-x-5 justify-between items-start p-8 text-white">
      <div className="actions col-span-1 flex flex-col gap-y-10">
        <h1 className="pb-4 border-b">Filter by status</h1>
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-start gap-x-5 items-center">
            <input type="radio" name="status" id="" value={"inProgress"} />
            <p>In-progress</p>
          </div>
          <div className="flex justify-start gap-x-5 items-center">
            <input type="radio" name="status" id="" value={"completed"} />
            <p>Completed</p>
          </div>
         
        </div>
        <h1 className="pb-4 border-b">Filter by project</h1>
        <div>
          {/* To be updated dynamically  */}

        </div>
        <h1 className="pb-4 border-b">Filter by Team</h1>
        <div>
          {/* To be updated dynamically  */}
          
        </div>
        <h1 className="pb-4 border-b">Filter by assignee</h1>
        <div>
          {/* To be updated dynamically  */}
          
        </div>
      </div>
      <div className="tasks col-span-4 h-[85vh] p-4 border-x">
        <h1 className="text-white text-center text-xl">Tasks</h1>

      </div>      
    </div>
  )
}

export default TaskBoard
