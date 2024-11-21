import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Frota from './pages/Frota'
import FaleConosco from './pages/FaleConosco'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/frota" element={<Frota />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
      </Routes>
    </Router>
  )
}

export default App