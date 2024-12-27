import './labelKakeibo.scss'

export const LabelKakeibo = ({htmlFor, className, children}) => {
  return (
    <label htmlFor={`${htmlFor}`} className={`${className}`}>{children}</label>
  )
}
