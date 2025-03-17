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
    const tagName = event.currentTarget.tagName
    let value = tagName === 'INPUT'? event.target.value : event.currentTarget.value === 'del' ? inputValue.slice(0, -1) : inputValue + event.currentTarget.value;
    const lastInput = value.at(-1)
    let newVal = [...values]
    let lastVal = newVal.at(-1)
    
    if(inputValue === 'ERROR') resetCalc()
    if(value.length < inputValue.length || event.currentTarget.value === 'del'){
      onDelete(inputValue.at(-1))
    }
    else if(isVal(lastInput) || 
      lastInput === '.' & isVal(lastVal.at(-1)) & lastVal.includes('.') === false || 
      lastInput === '-' & lastVal.includes('-') === false & lastVal.length === 0 
    ){
      newVal[values.length - 1] += lastInput
      setValue(newVal)
    }
    else if(isOperator(lastInput) && isVal(inputValue.at(-1))){
      setOperator([...operators, lastInput])
      setValue([...values, ''])
    }else return
    setInputValue(value)
  }

  const onDelete = (deletedVal) =>{   
    let newValues;   
    if(isVal(deletedVal) || deletedVal === '.' || deletedVal === '-'){
      if(values.at(-1).length === 1 && values.length > 1){
        newValues = values.slice(0, -1)
      }else{
        newValues = values.map((item, index) =>
          index === values.length - 1 ? values.at(-1).slice(0, -1) : item
        );
      }
      setValue(newValues)
    }else if(isOperator(deletedVal)){
      newValues = operators.slice(0, -1)
      setOperator(newValues)
    }
  }

  const calculate = () =>{
    let result = 0;
    let a;
    let b;
    let newVal = values
    const precedence = { '/': 1, '*': 2, '+': 3, '-': 4 };
    const sortedOperators = operators.sort((a, b) => precedence[a] - precedence[b]);
    for (let i = 0; i < sortedOperators.length; i++) {    
      a = parseFloat(newVal[0])
      b = parseFloat(newVal[1])      
      switch (sortedOperators[i]) {
        case '+':
          result = a + b
          break;
        case '-':
          result = a - b
          break;
        case '*':
          result = a * b
          break;
        case '/':
          if(b === 0){
            setInputValue('ERROR')
            return
          }
          result = a / b
          break;
      
        default:
          break;
      }
      newVal = newVal.slice(1)
      newVal = [result, ...newVal.slice(1)]
    }
    setOperator([])
    setValue([`${result}`])
    setInputValue(`${result}`)
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
