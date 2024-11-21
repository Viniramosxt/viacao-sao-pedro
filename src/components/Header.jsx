import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

export default function Header() {
  return (
    <div>
      {/* Header com informações de atendimento */}
      <div className="bg-blue-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 items-center">
            <span className="font-bold">ATENDIMENTO:</span>
            <span>sac@viacaosaopedro.com</span>
            <div className="text-sm">
              <div>Seg à Quin: 08:00h às 12:00 e 13:00 às 18:00h</div>
              <div>Sex: 08:00h às 12:00 e 13:00 às 17:00</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="bg-white border-b">
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
              <Link to="/" className="text-gray-700 hover:text-blue-600">Início</Link>
              <Link to="/empresa" className="text-gray-700 hover:text-blue-600">Empresa</Link>
              <Link to="/frota" className="text-gray-700 hover:text-blue-600">Frota</Link>
              <Link to="/fale-conosco" className="text-gray-700 hover:text-blue-600">Fale Conosco</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}