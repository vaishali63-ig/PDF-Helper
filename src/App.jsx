import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import ImageToPdf from './pages/ImageToPdf'
import PdfToImage from './pages/PdfToImage'
import MergePdf from './pages/MergePdf'

function App() {

  return (
     <div>
      <NavBar/>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/image-to-pdf' element= {<ImageToPdf/>} />
        <Route path='/pdf-to-image' element={<PdfToImage/>}/>
        <Route path='/merge-pdf' element = {<MergePdf/>}/>
      </Routes>
     </div>
  )
}

export default App
