import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import ImageToPdf from './pages/ImageToPdf'

function App() {

  return (
     <div>
      <NavBar/>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/image-to-pdf' element= {<ImageToPdf/>} />
      </Routes>
     </div>
  )
}

export default App
