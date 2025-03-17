import './calcField.css'

const CalcField = ({theme, inputValue, onInputChange, calc}) =>{
    const handleKeyDown = (event) =>{
        if(event.key === "Enter" || event.key === "="){
            calc()            
        }
    }
    return(
        <input 
            type="text" 
            className={`calc-input calc-input__theme-${theme} text__theme-${theme}`} 
            onChange={onInputChange}
            value={inputValue}
            onKeyDown={handleKeyDown}
        />
    )
}

export default CalcField