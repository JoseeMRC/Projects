import './inputKakeibo.scss'

export const InputKakeibo = (props) => {
  const {className, type, placeholder, value, name, id, onChange} = props;
  return (
    <input 
      className={`${className} input-kakeibo`} 
      type={type}
      placeholder={placeholder}
      value={value} 
      name={name}
      id={id} 
      onChange={onChange}
    />
  )
}
