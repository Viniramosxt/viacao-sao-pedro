import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import onibusGaragem from '../assets/onibus-garagem.jpeg';
import frotaAlinhada from '../assets/frota-alinhada.jpeg';
import onibusIndividual from '../assets/onibus-individual.jpeg';

export default function Frota() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: onibusIndividual, alt: "Ônibus modelo" },
    { src: onibusGaragem, alt: "Ônibus na garagem" },
    { src: frotaAlinhada, alt: "Frota alinhada" }
  ];

  const openImage = (index) => {
    setSelectedImage(images[index]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Banner com transição suave */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={frotaAlinhada} 
            alt="Nossa frota" 
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 w-full p-8 transform transition-all duration-500">
              <h1 className="text-4xl font-bold text-white text-center mb-4">
                Conheça Nossa Frota
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Seção inicial com animação de entrada */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 -mt-16 relative z-10 transform transition-all duration-500 hover:-translate-y-1">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nossa frota é composta por 153 veículos com idade média de 4,2 anos, 
              atendendo aos mais altos padrões de qualidade e conforto para nossos passageiros.
            </p>
          </div>

          {/* Galeria com transição suave */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {images.map((image, index) => (
              <div 
                key={index}
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
              </div>
            ))}
          </div>

          {/* Informações com animações */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-blue-50 rounded-lg p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Composição da Frota
              </h2>
              <div className="space-y-4">
                {[
                  "55 veículos série 2008",
                  "10 veículos série 2010",
                  "60 veículos série 2011",
                  "16 veículos série 2012",
                  "21 veículos série 2013"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 transform transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Micro-ônibus e Modelos
              </h2>
              <div className="space-y-4">
                {[
                  "4 Micro séries (2008)",
                  "6 Micros série 2012",
                  "Modelos: Volkswagen, Mercedes e Volvo"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 transform transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white rounded-lg transform transition-all duration-500 hover:scale-105">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Manutenção
                </h3>
                <p className="text-gray-700">
                  Percorremos mais de 1.000.000,00 km mensais e contamos com uma oficina própria 
                  que executa quase todos os serviços necessários à nossa frota.
                </p>
              </div>
            </div>
          </div>

          {/* Estatísticas com animações */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { value: "153", label: "Veículos na frota" },
              { value: "4.2", label: "Anos de idade média" },
              { value: "1M+", label: "Km percorridos/mês" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}