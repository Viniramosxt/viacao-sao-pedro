import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import equipeFoto from '../assets/equipe-completa.jpg';
import onibusGaragem from '../assets/onibus-garagem.jpg';

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
                Quem somos
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Seção inicial com animação de entrada */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 -mt-16 relative z-10 transform transition-all duration-500 hover:-translate-y-1">
            <p className="text-lg text-gray-700 leading-relaxed">
              A Viação São Pedro atua no transporte coletivo de Manaus desde agosto de 2011.
              Começamos operando 21 linhas nas zonas Oeste e Norte e, hoje, atendemos
              aproximadamente <strong>41 linhas</strong> em diversos pontos da cidade.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Nossa frota atual conta com <strong>215 veículos</strong> e transportamos
              mais de <strong>2.300.000</strong> passageiros.
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
                <li>• <strong>83</strong> veículos — Convencional</li>
                <li>• <strong>40</strong> veículos — Convencional Ar – P.E</li>
                <li>• <strong>21</strong> veículos — Convencional Ar</li>
                <li>• <strong>19</strong> veículos — Articulado Ar</li>
                <li>• <strong>17</strong> veículos — Micrão</li>
                <li>• <strong>2</strong> micro-ônibus (estimativa a partir do cadastro)</li>
              </ul>
            </div>
          </div>

          {/* Seção sobre a equipe */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Nossa Equipe</h2>
            <p className="mb-4">
              Contamos com mais de <strong>800 colaboradores</strong> diretos e investimos
              continuamente em capacitação nas diversas áreas de manutenção e operação.
            </p>
            <p>
              Percorremos mais de <strong>1.000.000 km</strong> por mês e contamos com
              oficina própria que executa quase todos os serviços necessários à nossa frota.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
