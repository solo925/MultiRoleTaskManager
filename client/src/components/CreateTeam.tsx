import { IoPersonAdd } from 'react-icons/io5'
import PropTypes from 'prop-types'

interface TeamProps {
  clickFunction: ()=>void
}

const CreateTeam:React.FC<TeamProps> = ({clickFunction}) => {
  return (
    <div onClick={clickFunction} className="flex flex-col justify-center p-4 gap-y-4 items-center rounded-lg bg-green-500 text-white">
        <p className='text-lg font-medium'>Create a new Team</p>
        <IoPersonAdd className='text-3xl'></IoPersonAdd>
    </div>
  )
}

CreateTeam.propTypes = {
  clickFunction:PropTypes.func.isRequired
}

export default CreateTeam
