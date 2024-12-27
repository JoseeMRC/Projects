import './textareaKakeibo.scss'

export const TextareaKakeibo = (props) => {
    const {className, rows, placeholder, value, name, id, onChange} = props;
    
    return (
        <textarea 
            className={`${className} textarea-kakeibo`} 
            rows={rows}
            placeholder={placeholder}
            value={value !== null ? value : ""} 
            name={name}
            id={id} 
            onChange={onChange}
        />
    )
}