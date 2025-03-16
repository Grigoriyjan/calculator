import React, {useState} from 'react'
import Header from './components/header/header';
import CalcField from './components/input/CalcField';
import CalcBtns from './components/CalcBtns/CalcBtns';

function App() {
  const [theme, setTheme] = useState('dark');
  const [inputValue, setInputValue] = useState('')
  const [values, setValue] = useState([''])
  const [operators, setOperator] = useState([])
  const toggleTheme = (theme) => {setTheme(theme)};

  const isOperator = (str) => /^[+\-*/]$/.test(str);
  const isVal = (str) => /^[0-9]$/.test(str);
  
  const onInputChange = (event) =>{
    let value = event.target.value
    const lastInput = value.at(-1)
    let newVal = [...values]
    let lastVal = newVal.at(-1)

    if(value.length < inputValue.length){
      onDelete()
      return
    }

    if(isVal(lastInput) || 
      lastInput === '.' & isVal(lastVal.at(-1)) & lastVal.includes('.') === false || 
      lastInput === '-' & lastVal.includes('-') === false & lastVal.length === 0 
    ){
      console.log('valid');
      newVal[values.length - 1] += lastInput
      setValue(newVal)
    }
    else if(isOperator(lastInput) && isVal(inputValue.at(-1))){
      setOperator([...operators, lastInput])
      setValue([...values, ''])
    }else return
    
    setInputValue((prev) => prev + lastInput)
  }
  const onDelete = () =>{
    console.log('remove');
    
  }

  const calculate = () =>{
    // if(operator === null || inputValue.indexOf(operator) === inputValue.length - 1) return
    // const parts = inputValue.split(operator)
    // let a = parseFloat(parts[0])
    // let b = parseFloat(parts[1])
    // let result = 0
    // switch (operator) {
    //   case "+":
    //     result = a + b
    //     break;
    //   case "-":
    //     result = a - b
    //     break;
    //   case "*":
    //     result = a * b
    //     break;
    //   case "/":
    //     result = b === 0 ? "error" : a / b
    //     break;
    //   default:
    //     break;
    // }
    // setOperator(null)
    // setInputValue(`${result}`)
  }

  const resetCalc = () =>{
    setInputValue(" ")
    setValue([""])
    setOperator([])
  }

  return (
    <div className={`App App__bg-theme-${theme}`}>
      <div className='container'>
        <Header theme={theme} toggleTheme={toggleTheme}/>
        <CalcField theme={theme} inputValue={inputValue} onInputChange={onInputChange} calc={calculate}/>
        <CalcBtns theme={theme} calc={calculate} onInputChange={onInputChange} reset={resetCalc} remove={onDelete}/>
      </div>
    </div>
  );
}

export default App;
