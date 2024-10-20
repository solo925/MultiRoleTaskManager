import React, { useState } from 'react'

interface TaskDetails {
    description: string,
    status?: string,
    dueDate?: string,
    assignee?: string,
    comments?: string[],
    editTask?: () => void,
    addComment?: (taskID: string) => void,
    assignTask?: (taskID: string, userEmail: string) => void
}

const TaskCard: React.FC<TaskDetails> = ({ description, status, dueDate, assignee, comments }) => {
    const [toggleAssign,setAssignToggle] = useState(false);
    const [toggleComment,setCommentToggle] = useState(false);
    const [toggleEdit,setEditToggle] = useState(false);

    return (
        <div className='p-4 rounded-md shadow-md w-96 relative'>
            <div className="bg-white text-black w-full">{description}</div>
            <div className="text-sm font-light">Status: {status}</div>
            <div>Due date: {dueDate}</div>
            <div>Assigned to {assignee}</div>
            <div className='flex flex-col justify-start gap-y-3 text-xs font-medium'>
                {
                    comments.map((eachComment, index) => <div key={index}>{eachComment}</div>)
                }
            </div>
            <div className="flex gap-x-6">
                <button onClick={()=>setEditToggle(prev => !prev)}>Edit Task</button>
                <button onClick={()=>setCommentToggle(prev => !prev)}>Add comment</button>
                <button onClick={()=>setAssignToggle(prev => !prev)}>Assign Task</button>
            </div>

            {
                toggleEdit && (<div className="editTask absolute top-10 left-10">
                <div className="flex flex-col gap-y-3">
                    <div>
                        <label htmlFor="Description">Task description</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label htmlFor="Description">Task Status</label>
                        <select name="status" id="">
                            <option value="completed">Completed</option>
                            <option value="inProgress">In progress</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Description">Due date</label>
                        <input type="date" />
                    </div>
               
                    <button type='submit'>Edit Task</button>
                </div>
            </div>)
            }

            {
                toggleComment && (<div className="addComment absolute top-10 left-10">
                <div>
                    <label htmlFor="Description">Comment ID</label>
                    <input type="text" aria-readonly readOnly />
                </div>
                <div>
                    <label htmlFor="Description">Comment</label>
                    <textarea name="" id="" placeholder='Input your comment'></textarea>
                </div>
                <div>
                    <label htmlFor="Description">Task ID</label>
                    <input type="string" readOnly aria-readonly/>
                </div>
                <div>
                    <label htmlFor="Description">User ID</label>
                    <input type="string" readOnly aria-readonly/>
                </div>

                <button type='submit'>Add Comment</button>
            </div>)
            }

            {
                toggleAssign && ( <div className="assignTask absolute top-10 left-10">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="" placeholder='Input an email' />
                </div>
                <button type='submit'>Assign Task</button>
            </div>)
            }
        </div>
    )
}

export default TaskCard
