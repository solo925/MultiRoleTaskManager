import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

interface Comment {
    comment: string
    taskId: string
    userId: string
    xata_createdat: string
    xata_id: string
    xata_updatedat: string
    xata_version: number
}

interface ApiResponse {
    comments: Comment[]
}

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingComment, setEditingComment] = useState<Comment | null>(null)
    const [updatedText, setUpdatedText] = useState("")

    const fetchComments = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:3000/api/v1/comments")
            
            if (!response.ok) {
                toast.error("Error fetching comments")
                return
            }

            const data: ApiResponse = await response.json()
            setComments(data.comments)
        } catch (error) {
            toast.error("Failed to fetch comments")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const handleDelete = async (commentId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                toast.error("Failed to delete comment")
                return
            }

            await fetchComments() // Refresh comments after deletion
            toast.success("Comment deleted successfully")
        } catch (error) {
            toast.error("Error deleting comment")
            console.error(error)
        }
    }

    const handleUpdate = async () => {
        if (!editingComment || !updatedText.trim()) return

        try {
            const response = await fetch(`http://localhost:3000/api/v1/comments/${editingComment.xata_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment: updatedText,
                    taskId: editingComment.taskId,
                    userId: editingComment.userId,
                    xata_version: editingComment.xata_version
                })
            })

            if (!response.ok) {
                toast.error("Failed to update comment")
                return
            }

            await fetchComments() // Refresh comments after update
            toast.success("Comment updated successfully")
            handleCancelEdit()
        } catch (error) {
            toast.error("Error updating comment")
            console.error(error)
        }
    }

    const handleEdit = (comment: Comment) => {
        setEditingComment(comment)
        setUpdatedText(comment.comment)
    }

    const handleCancelEdit = () => {
        setEditingComment(null)
        setUpdatedText("")
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-white">Loading comments...</div>
            </div>
        )
    }

    return (
        <div className="p-8 relative max-w-3xl mx-auto">
            <Toaster position="top-left" />
            <h1 className="text-2xl font-bold mb-6 text-center text-white">Comments</h1>
            
            {comments.length === 0 ? (
                <div className="text-center bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-500">No comments yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div 
                            key={comment.xata_id}
                            className="bg-white p-4 rounded-lg shadow transition-all duration-200 hover:shadow-lg"
                        >
                            {editingComment?.xata_id === comment.xata_id ? (
                                <div className="space-y-4">
                                    <textarea
                                        value={updatedText}
                                        onChange={(e) => setUpdatedText(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        rows={3}
                                    />
                                    <div className="flex gap-x-3">
                                        <button 
                                            onClick={handleUpdate}
                                            className="bg-success px-4 py-2 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                                            disabled={!updatedText.trim()}
                                        >
                                            Save
                                        </button>
                                        <button 
                                            onClick={handleCancelEdit}
                                            className="bg-gray-500 px-4 py-2 text-white rounded-md hover:bg-gray-600 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start">
                                        <p className="text-gray-800 mb-2">{comment.comment}</p>
                                        <div className="flex gap-x-2">
                                            <button 
                                                onClick={() => handleEdit(comment)}
                                                className="text-green-600 hover:text-green-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(comment.xata_id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <time>
                                            Last updated: {new Date(comment.xata_updatedat).toLocaleString()}
                                        </time>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comments