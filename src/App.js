import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './Pages/Home/Home'
const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>
          <h1>404 Not Found</h1>
        </div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
