import  {useState}  from 'react';
import './App.css';
import About from './components/About.js';
import Navbar from './components/Navbar.js';
import Alert from './components/Alert.js'; 
import TextForm from './components/TextForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";


function App() {
  const [mode, setmode]= useState('light');
  const [alert, setAlert]= useState(null);

  const showalert= (message, type)=>{
    setAlert({
      message: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    }, 1000)
  }

  const toggleMode= ()=>{
    if(mode==='light') {
      setmode('dark');
      document.body.style.backgroundColor='gray';
      showalert("Dark Mode has been enabled", "success");
      document.title='TextUtils- Dark Mode';
    }
    else{
      setmode('light');
      document.body.style.backgroundColor='white';
      showalert("Light Mode has been enabled", "success");
      document.title='TextUtils- Light Mode';
    }
  }
  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
        <Alert alert={alert}/>
        <div className='container mt-5'>
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/" element={<TextForm showalert={showalert} heading="Try TextUtils - word counter, character counter" mode={mode} />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
