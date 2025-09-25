import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Empresa from './pages/Empresa'
import Frota from './pages/Frota'
import FaleConosco from './pages/FaleConosco'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import TrabalheConosco from './pages/TrabalheConosco'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/frota" element={<Frota />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
      </Routes>
    </Router>
  )
}

export default App