import { TbNewSection } from "react-icons/tb";
import PropTypes from 'prop-types'

interface ProjectProps {
  clickFunction: ()=>void
}

const CreateProject:React.FC<ProjectProps> = ({clickFunction}) => {
  return (
    <div onClick={clickFunction} className="flex flex-col w-80 justify-center p-4 gap-y-4 items-center rounded-lg bg-green-500 text-white">
        <p className='text-lg font-medium'>Create a new Project</p>
        <TbNewSection className='text-3xl'></TbNewSection>
    </div>
  )
}

CreateProject.propTypes = {
  clickFunction:PropTypes.func.isRequired
}

export default CreateProject