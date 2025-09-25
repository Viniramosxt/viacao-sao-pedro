import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import onibusGaragem from '../assets/onibus-garagem.jpg';
import frotaAlinhada from '../assets/frota-alinhada.jpg';
import onibusIndividual from '../assets/onibus-individual.jpg';

export default function Frota() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: onibusIndividual, alt: 'Ônibus modelo' },
    { src: onibusGaragem, alt: 'Ônibus na garagem' },
    { src: frotaAlinhada, alt: 'Frota alinhada' },
  ];

  const openImage = (index) => setSelectedImage(images[index]);
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Banner */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img
            src={frotaAlinhada}
            alt="Nossa frota"
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 w-full p-8">
              <h1 className="text-4xl font-bold text-white text-center mb-4">
                Conheça Nossa Frota
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Texto introdutório */}
          <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 -mt-16 relative z-10 transform transition-all duration-500 hover:-translate-y-1 hover:border-blue-500">
            <p className="text-lg text-gray-300 leading-relaxed">
              Nossa frota é composta por <strong className="text-white">215 veículos</strong>, atendendo aos mais altos
              padrões de qualidade e conforto para nossos passageiros.
            </p>
          </div>

          {/* Galeria */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => openImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{image.alt}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Informações */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:border-blue-500">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Composição da Frota</h2>
              <div className="space-y-4">
                {[
                  '83 veículos — Convencional',
                  '40 veículos — Convencional Ar – P.E',
                  '21 veículos — Convencional Ar',
                  '19 veículos — Articulado Ar',
                  '17 veículos — Micrão',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 transform transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:border-blue-500">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Micro-ônibus e Modelos</h2>
              <div className="space-y-4">
                {[
                  '2 micro-ônibus (estimativa a partir do cadastro)',
                  'Modelos mais comuns: Convencional, Convencional Ar – P.E, Convencional Ar, Articulado Ar e Micrão',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 transform transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-800 border border-gray-600 rounded-lg transform transition-all duration-500 hover:scale-105 hover:border-blue-500">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Manutenção</h3>
                <p className="text-gray-300">
                  Percorremos mais de <strong className="text-white">1.500.000 km</strong> mensais e contamos com uma
                  oficina própria que executa quase todos os serviços necessários à nossa frota.
                </p>
              </div>
            </div>
          </div>

          {/* Cards de estatísticas */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { value: '215', label: 'Veículos na frota' },
              { value: '15M+', label: 'Idade média (anos)' }, // sem coluna de ano no CSV atual
              { value: '1.5M+', label: 'Km percorridos/mês' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal de imagem */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[85vh] max-w-[95vw] rounded-lg shadow-2xl"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
