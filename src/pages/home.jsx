import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NetflixRow from '../components/NetflixRow';
import FeatureGrid from '../components/FeatureGrid';
import { Bus, Calendar, Bell, Briefcase } from 'lucide-react';
import onibusIndividual from '../assets/onibus-individual.jpg';
import equipeFoto from '../assets/equipe-completa.jpg';
import onibusGaragem from '../assets/onibus-garagem.jpg';
import pontosManaus from '../assets/pontos-turisticos.jpg';
import frotaAlinhada from '../assets/frota-alinhada.jpg';
import onibusFundo from '../assets/onibus-fundo.png';

export default function Home() {

  const items = [
    {
      type: 'video',
      src: '/videos/homenagem.mp4',
      poster: '/videos/homenagem-poster.jpg',
      title: 'DIA DOS MOTORISTAS',
      description: 'Uma homenagem especial aos nossos motoristas'
    },
    {
      type: 'image',
      src: onibusIndividual,
      title: 'Conforto e Modernidade',
      description: 'Ônibus moderno e confortável da nossa frota'
    },
    {
      type: 'image',
      src: equipeFoto,
      title: 'Nossa Equipe',
      description: 'Profissionais dedicados ao seu melhor transporte'
    },
    {
      type: 'image',
      src: onibusGaragem,
      title: 'Infraestrutura',
      description: 'Garagem moderna para manutenção da frota'
    },
    {
      type: 'image',
      src: frotaAlinhada,
      title: 'Frota Completa',
      description: 'Nossa frota completa pronta para servir'
    },
    {
      type: 'image',
      src: pontosManaus,
      title: 'Pontos Turísticos',
      description: 'Conectando você aos pontos turísticos de Manaus'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section com Imagem de Fundo */}
        <div className="relative h-[955px] overflow-hidden -mt-1">
          {/* Imagem de Fundo */}
          <div 
            className="absolute -top-16 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${onibusFundo})` }}
          />
          
          {/* Overlay Gradiente que se funde com o preto */}
          <div className="absolute -top-16 left-0 right-0 bottom-0 bg-gradient-to-b from-blue-900/90 via-blue-800/80 to-black" />
          
          {/* Conteúdo */}
          <div className="relative z-10 container mx-auto h-full flex items-center px-8">
            <div className="max-w-3xl text-white">
              <h1 className="text-7xl font-bold mb-6 leading-tight">
                Viação São Pedro
              </h1>
              <p className="text-2xl mb-8 opacity-95 leading-relaxed">
                Conectando você aos principais destinos com conforto, segurança e pontualidade.
              </p>
              <div className="flex space-x-6">
                <button className="bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Nossas Rotas
                </button>
                <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  Fale Conosco
                </button>
              </div>
            </div>
          </div>
          
          {/* Gradiente suave para transição */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black"></div>
        </div>

        {/* Carrossel Netflix Profissional */}
        <div className="bg-black py-14 -mt-16">
          <NetflixRow title="Nossa Empresa" items={items} />
        </div>

        {/* Grid de ações principais (coeso) */}
        <div className="bg-black">
          <FeatureGrid
          items={[
            {
              title: "Informativos",
              desc: "Notícias e avisos operacionais da Viação São Pedro.",
              icon: Bell,
              to: "/blog",
              cta: "Acessar notícias",
            },
            {
              title: "Treinamentos",
              desc: "Capacitações e reciclagens internas para colaboradores.",
              icon: Calendar,
              to: "/blog",
              cta: "Ver agenda",
            },
            {
              title: "Trabalhe Conosco",
              desc: "Envie seu currículo e faça parte da nossa equipe.",
              icon: Briefcase,
              to: "/trabalhe-conosco",
              cta: "Enviar currículo",
            },
            {
              title: "Frota",
              desc: "Conheça nossa frota e os padrões de manutenção.",
              icon: Bus,
              to: "/frota",
              cta: "Conhecer frota",
            },
          ]}
        />
        </div>
      </main>

      <Footer />
    </div>
  );
}