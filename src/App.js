import React, {useState} from 'react'
import Header from './components/header/header';


function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = (theme) => {setTheme(theme)};
  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme}/>
    </div>
  );
}

export default App;
