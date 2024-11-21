import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Bus, Calendar, Bell, Users } from 'lucide-react';
import onibusIndividual from '../assets/onibus-individual.jpeg';
import equipeFoto from '../assets/equipe-completa.jpeg';
import onibusGaragem from '../assets/onibus-garagem.jpeg';
import pontosManaus from '../assets/pontos-turisticos.jpeg';
import frotaAlinhada from '../assets/frota-alinhada.jpeg';

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    { src: onibusIndividual, alt: "Ônibus individual da frota", title: "Conforto e Modernidade" },
    { src: equipeFoto, alt: "Equipe Viação São Pedro", title: "Nossa Equipe" },
    { src: onibusGaragem, alt: "Ônibus na garagem", title: "Infraestrutura" },
    { src: frotaAlinhada, alt: "Nossa frota completa", title: "Frota Completa" },
    { src: pontosManaus, alt: "Pontos turísticos de Manaus", title: "Manaus" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section com Carrossel */}
        <div className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay */}
          
          {/* Carrossel */}
          <div className="relative h-full">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transform transition-transform duration-1000 ease-out ${
                  index === currentImage ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-20">
                  <h2 className="text-5xl font-bold mb-4">{img.title}</h2>
                  <p className="text-xl opacity-90">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controles do Carrossel */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          >
            ❮
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          >
            ❯
          </button>
        </div>

        {/* Seção de Cards */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Bell className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Informativos</h3>
                <p className="text-gray-600">
                  Fique por dentro das últimas notícias e atualizações sobre nosso serviço de transporte.
                </p>
              </div>
              <div className="px-6 pb-6">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Saiba mais →
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Calendar className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Treinamentos</h3>
                <p className="text-gray-600">
                  Acompanhe nossos programas de capacitação e desenvolvimento profissional.
                </p>
              </div>
              <div className="px-6 pb-6">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Ver agenda →
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Users className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Fã Page</h3>
                <p className="text-gray-600">
                  Conecte-se conosco nas redes sociais e fique por dentro de todas as novidades.
                </p>
              </div>
              <div className="px-6 pb-6">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Seguir →
                </a>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Bus className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Frota</h3>
                <p className="text-gray-600">
                  Conheça nossa moderna frota de ônibus, preparada para seu conforto e segurança.
                </p>
              </div>
              <div className="px-6 pb-6">
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Explorar →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}