import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import Admin from './pages/Admin'
function App() {

  return (
    <>
      <BrowserRouter>
        <div className='app-cont'>
          <Navbar />
          {/* <div> */}
            <Routes>
            <Route path='/' element={<ProductsPage />} />
              <Route path='products' element={<ProductsPage />} />
              <Route path='admin' element={<Admin />} />
              <Route path="/admin/:id" element={<Admin/>} />
            </Routes>
          {/* </div> */}

        </div>
      </BrowserRouter>

    </>
  )
}

export default App
