import PropTypes from 'prop-types'
import React from 'react'

interface ButtonProps {
    text:string,
    color?:string,
    hoverTextColor?:string,
    hoverBgColor?:string,
    link?:string,
    clickFunction?:()=> void
}

const Button :React.FC<ButtonProps> = ({text,color,hoverTextColor,hoverBgColor,link,clickFunction}) => {
  return (
    <a href={link} className={`p-2.5 mx-auto text-center hover:rounded-full cursor-pointer text-${color} hover:text-${hoverTextColor} bg-white hover:bg-${hoverBgColor} px-6 hover:`} onClick={clickFunction}>
      {text}
    </a>
  )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color:PropTypes.string,
    hoverTextColor:PropTypes.string,
    hoverBgColor:PropTypes.string,
    link:PropTypes.string,
    clickFunction:PropTypes.func

}

export default Button
