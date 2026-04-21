import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import LoginPages from './Pages/Login/LoginPages.jsx'   
import PaginaInicio from './Pages/PaginaInicio/PaginaInicio.jsx'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Protected from './Pages/Login/Protected.jsx';
//import './App.css'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPages isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
          <Route path="/home" element={<Protected isSignedIn={isSignedIn} ><PaginaInicio /></Protected>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App




