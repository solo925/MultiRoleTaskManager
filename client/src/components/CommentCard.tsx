import { FaRegComments } from "react-icons/fa6";

const CommentCard = () => {
  return (
    <div className="flex w-80 flex-col bg-card gap-y-3 p-3 justify-center items-center py-5 rounded-md">
        <FaRegComments className="text-3xl"></FaRegComments>
        <h1 className="text-base font-medium text-center text-black">Do not go unheard</h1>
        <p className="text-sm font-light text-center text-black">What is bothering your mind. Speak it up now!!</p>
    </div>
  )
}

export default CommentCard
