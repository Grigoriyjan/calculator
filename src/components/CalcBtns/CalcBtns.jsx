import './calcBtns.css'
const CalcBtns = ({theme, calc,onInputChange, reset}) =>{
    return(
        <div className={`btns-container primary__background-theme-${theme}`}>
            <button onClick={onInputChange} value={7} className={`btns-container__btn btn__theme-${theme}`}>7</button>
            <button onClick={onInputChange} value={8} className={`btns-container__btn btn__theme-${theme}`}>8</button>
            <button onClick={onInputChange} value={9} className={`btns-container__btn btn__theme-${theme}`}>9</button>
            <button onClick={onInputChange} value={'del'} className={`btns-container__btn btn__theme-${theme} btn__secondary-theme-${theme} btn__font-size`}>DEL</button>
            <button onClick={onInputChange} value={4} className={`btns-container__btn btn__theme-${theme}`}>4</button>
            <button onClick={onInputChange} value={5} className={`btns-container__btn btn__theme-${theme}`}>5</button>
            <button onClick={onInputChange} value={6} className={`btns-container__btn btn__theme-${theme}`}>6</button>
            <button onClick={onInputChange} value={'+'} className={`btns-container__btn btn__theme-${theme}`}>+</button>
            <button onClick={onInputChange} value={1} className={`btns-container__btn btn__theme-${theme}`}>1</button>
            <button onClick={onInputChange} value={2} className={`btns-container__btn btn__theme-${theme}`}>2</button>
            <button onClick={onInputChange} value={3} className={`btns-container__btn btn__theme-${theme}`}>3</button>
            <button onClick={onInputChange} value={'-'} className={`btns-container__btn btn__theme-${theme}`}>-</button>
            <button onClick={onInputChange} value={'.'} className={`btns-container__btn btn__theme-${theme}`}>.</button>
            <button onClick={onInputChange} value={0} className={`btns-container__btn btn__theme-${theme}`}>0</button>
            <button onClick={onInputChange} value={'/'} className={`btns-container__btn btn__theme-${theme}`}>/</button>
            <button onClick={onInputChange} value={'*'} className={`btns-container__btn btn__theme-${theme}`}>x</button>
            <button onClick={reset} className={`btns-container__btn btn__secondary-theme-${theme} btn__font-size reset--btn`}>RESET</button>
            <button onClick={calc} className={`btns-container__btn btn__third-theme-${theme} calc--btn`}>=</button>
        </div>
    )
}

export default CalcBtns