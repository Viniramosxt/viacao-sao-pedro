import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import equipeFoto from '../assets/equipe-completa.jpeg';
import onibusGaragem from '../assets/onibus-garagem.jpeg';

export default function Empresa() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Banner com transição suave */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={equipeFoto} 
            alt="Equipe Viação São Pedro" 
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 w-full p-8 transform transition-all duration-500">
              <h1 className="text-4xl font-bold text-white text-center mb-4">
                Quem Somos nós?
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Seção inicial com animação de entrada */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 -mt-16 relative z-10 transform transition-all duration-500 hover:-translate-y-1">
            <p className="text-lg text-gray-700 leading-relaxed">
              A Viação São Pedro atua no transporte coletivo em Manaus desde Agosto de 2011 onde passou a operar 21 linhas nas zonas oeste e norte de Manaus, quando foi a vencedora do lote 02. Atualmente continuamos atendendo às 21 linhas em diversos pontos da cidade.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Com 131 veículos em operação, e transportamos mais de 2.300.000 passageiros.
            </p>
          </div>

          {/* Grid com informações sobre a frota */}
          <div className="grid md:grid-cols-2 gap-8 my-12">
            <img 
              src={onibusGaragem} 
              alt="Nossa garagem" 
              className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Nossa Frota</h2>
              <ul className="space-y-2">
                <li>• 55 série 2008</li>
                <li>• 10 de série 2010</li>
                <li>• 60 série 2011</li>
                <li>• 16 série 2012</li>
                <li>• 21 Série 2013</li>
                <li>• 4 Micro séries (2008)</li>
                <li>• 6 Micros série 2012</li>
              </ul>
            </div>
          </div>

          {/* Seção sobre a equipe */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Nossa Equipe</h2>
            <p className="mb-4">
              Contamos com mais de 800 colaboradores diretos e promovemos o treinamento e desenvolvimento constante com treinamento nas diversas áreas de manutenção.
            </p>
            <p>
              Percorremos mais de 1.000.000,00 km mensais e contamos com uma oficina própria que executa quase todos os serviços necessários à nossa frota.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}