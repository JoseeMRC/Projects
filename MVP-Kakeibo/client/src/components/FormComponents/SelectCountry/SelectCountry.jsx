import Select from 'react-select'
import './selectCountry.scss'

export const SelectCountry = (props) => {
  const {className, placeholder, options, value, onChange} = props;
  return (
    <Select 
      className={`${className} select-country`}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      isClearable
    />
  )
}
