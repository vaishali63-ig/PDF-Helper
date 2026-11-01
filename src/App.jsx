import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import ImageToPdf from './pages/ImageToPdf'
import PdfToImage from './pages/PdfToImage'

function App() {

  return (
     <div>
      <NavBar/>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/image-to-pdf' element= {<ImageToPdf/>} />
        <Route path='/pdf-to-image' element={<PdfToImage/>}/>
      </Routes>
     </div>
  )
}

export default App
