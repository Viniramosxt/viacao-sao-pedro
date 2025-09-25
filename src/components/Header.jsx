import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Viação São Pedro" 
                className="h-12 object-contain"
              />
            </Link>
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-300 hover:text-blue-400">Início</Link>
              <Link to="/empresa" className="text-gray-300 hover:text-blue-400">Empresa</Link>
              <Link to="/frota" className="text-gray-300 hover:text-blue-400">Frota</Link>
              <Link to="/blog" className="text-gray-300 hover:text-blue-400">Notícias</Link>
              <Link to="/trabalhe-conosco" className="text-gray-300 hover:text-blue-400">Trabalhe Conosco</Link>
            </div>
          </div>
        </div>
      </nav>
  );
}