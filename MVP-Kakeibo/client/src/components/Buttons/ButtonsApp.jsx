/* eslint-disable react/prop-types */

import './buttonsApp.scss'

export const ButtonsApp = ({color, clickar, textButton, type, disabled, className}) => {
  return (
    <button className={`${className} ${color} myButton`} onClick={clickar} type={type}
    disabled={disabled}
    > 
    {textButton} 

    </button>
  )
}
