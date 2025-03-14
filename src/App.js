import React, {useState} from 'react'
import Header from './components/header/header';
import CalcField from './components/input/CalcField';
import CalcBtns from './components/CalcBtns/CalcBtns';

function App() {
  const [theme, setTheme] = useState('dark');
  const [inputValue, setInputValue] = useState('')
  const [operator, setOperator] = useState(null)
  const toggleTheme = (theme) => {setTheme(theme)};

  const isArithmetic = (str) => /^[+\-*/]$/.test(str);
  const isNum = (str) => /^[-0-9]*(\.[0-9]*)?$/.test(str);
  
  const onInputChange = (event) =>{
    let value;

    // Если событие пришло от input
    if (event.target.tagName === 'INPUT') {
      value = event.target.value;
    }
    // Если событие пришло от button
    else if (event.currentTarget.tagName === 'BUTTON') {
      value = event.currentTarget.value === 'del' ? inputValue.slice(0, -1) : inputValue + event.currentTarget.value; // Добавляем значение кнопки к текущему значению
    }

    const lastVal = value[value.length - 1]; // Последний введённый символ

    // Сброс ошибки
    if (inputValue === "error") {
      value = lastVal;
    }

    // Обработка удаления символа
    if (value.length < inputValue.length) {
      if (isArithmetic(inputValue[inputValue.length - 1])) {
        setOperator(null);
      }
    }
    // Обработка добавления оператора
    else if (inputValue.length > 0 && isArithmetic(lastVal) && operator === null) {
      setOperator(lastVal);
    }
    // Блокировка невалидных символов
    else if (!isNum(lastVal)) {
      return;
    }

    setInputValue(value);
  }

  const calculate = () =>{
    if(operator === null || inputValue.indexOf(operator) === inputValue.length - 1) return
    const parts = inputValue.split(operator)
    let a = parseFloat(parts[0])
    let b = parseFloat(parts[1])
    let result = 0
    switch (operator) {
      case "+":
        result = a + b
        break;
      case "-":
        result = a - b
        break;
      case "*":
        result = a * b
        break;
      case "/":
        result = b === 0 ? "error" : a / b
        break;
      default:
        break;
    }
    setOperator(null)
    setInputValue(`${result}`)
  }

  return (
    <div className={`App App__bg-theme-${theme}`}>
      <div className='container'>
        <Header theme={theme} toggleTheme={toggleTheme}/>
        <CalcField theme={theme} inputValue={inputValue} onInputChange={onInputChange} calc={calculate}/>
        <CalcBtns theme={theme} calc={calculate} onInputChange={onInputChange} reset={() => setInputValue(" ")}/>
      </div>
    </div>
  );
}

export default App;
