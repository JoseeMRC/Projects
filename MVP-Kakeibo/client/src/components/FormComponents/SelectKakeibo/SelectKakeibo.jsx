import './selectKakeibo.scss'

export const SelectKakeibo = (props) => {
    const {className, placeholder, onChange, name, children} = props;
    return (
      <select 
        className={`${className} select-kakeibo`}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      >
        {children}
      </select>
      
    )
  }