import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import pontosManaus from '../assets/pontos-turisticos.jpeg';

export default function FaleConosco() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Banner com transição suave */}
        <div className="relative h-[250px] md:h-[300px] overflow-hidden">
          <img 
            src={pontosManaus} 
            alt="Manaus" 
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 w-full p-8 transform transition-all duration-500">
              <h1 className="text-4xl font-bold text-white text-center mb-4">
                Fale Conosco
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Formulário de contato */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-center text-lg mb-8">
                Quer trabalhar conosco? Envie seu curriculum para:
                <br />
                <span className="text-blue-600 font-semibold">selecao@viacaosaopedro.com</span>
                <br />
                Boa sorte!
              </p>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium" htmlFor="nome">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium" htmlFor="email">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium" htmlFor="assunto">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="assunto"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium" htmlFor="mensagem">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows="5"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}