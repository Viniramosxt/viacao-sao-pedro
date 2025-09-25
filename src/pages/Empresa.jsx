import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureGridImage from "../components/FeatureGridImage";
import { MapPin, CheckCircle2, Briefcase, Users } from "lucide-react";

import equipeFoto from "../assets/equipe-completa.jpg";
import frotaAlinhada from "../assets/frota-alinhada.jpg";
import onibusGaragem from "../assets/onibus-garagem.jpg";
import pontosManaus from "../assets/pontos-turisticos.jpg";

const ADDRESS_TEXT =
  "R. do Riacho Ecológico, n° 682 - Tarumã Açu, Manaus - AM, 69024-160";

const MAPS_URL =
  "https://www.google.com/maps/place/Via%C3%A7%C3%A3o+S%C3%A3o+Pedro+Ltda/@-2.9774462,-60.0542779,20z/data=!4m10!1m2!2m1!1zdmlhw6fDo28gc8OjbyBwZWRybw!3m6!1s0x926c108d821e3b7f:0xeb5f9ac444717f45!8m2!3d-2.9774689!4d-60.0542823!15sChN2aWHDp8OjbyBzw6NvIHBlZHJvkgEQdHJ1Y2tpbmdfY29tcGFueaoBVhABKhciE3ZpYcOnw6NvIHPDo28gcGVkcm8oDDIgEAEiHD1tgMP-xwYsAL0lIteAvSArMFyK3MlCC_HVO4IyFxACIhN2aWHDp8OjbyBzw6NvIHBlZHJv4AEA!16s%2Fg%2F11cfh_k0p?entry=ttu&g_ep=EgoyMDI1MDkyMS4wIKXMDSoASAFQAw%3D%3D";

export default function Empresa() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      {/* Hero */}
      <section className="relative h-[360px] md:h-[420px] overflow-hidden">
        <img
          src={frotaAlinhada}
          alt="Frota Viação São Pedro"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="relative z-10 container mx-auto h-full flex items-end px-6 pb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow">
              Sobre a Viação São Pedro
            </h1>
            <p className="text-white/90 mt-3 max-w-3xl">
              Conectando Manaus com segurança, pontualidade e respeito desde
              2011. Conheça nossa história, cultura e compromisso com a cidade.
            </p>
          </div>
        </div>
      </section>

      {/* Quem somos */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Quem somos</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A Viação São Pedro atua no transporte coletivo de Manaus desde
            27/04/2011. Começamos operando 21 linhas e, hoje, atendemos
            aproximadamente <b>41 linhas</b> em diversas regiões da cidade.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Nossa operação é sustentada por manutenção preventiva, tecnologia a
            bordo e capacitação contínua das equipes — sempre com foco no
            passageiro e em serviços confiáveis.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-3xl font-extrabold text-blue-400">215</p>
              <p className="text-gray-400 text-sm">Veículos na frota</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-blue-400">2.3M+</p>
              <p className="text-gray-400 text-sm">Passageiros/mês</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-blue-400">41</p>
              <p className="text-gray-400 text-sm">Linhas operadas</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src={equipeFoto} alt="Equipe" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Dados cadastrais & localização */}
      <section className="bg-gray-900">
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Dados cadastrais & localização
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bloco de dados */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Razão Social</p>
                  <p className="text-white font-medium">Viação São Pedro LTDA</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">CNPJ</p>
                  <p className="text-white font-medium">17.256.249/0002-46</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Situação Cadastral</p>
                  <p className="text-white font-medium">Ativa</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">
                    Atividade Principal (CNAE 4921-3/01)
                  </p>
                  <p className="text-white font-medium">
                    Transporte rodoviário coletivo de passageiros, com
                    itinerário fixo, municipal
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-400 pt-2">
                <span className="text-gray-300">Desde:</span> 27/04/2011
              </div>
            </div>

            {/* Localização */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Endereço</p>
                  <p className="text-white font-medium">{ADDRESS_TEXT}</p>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
                title="Abrir no Google Maps"
              >
                <MapPin className="w-5 h-5" />
                Ver no Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ações principais */}
      <div className="bg-black">
        <FeatureGridImage
          items={[
            {
              title: "Informativos",
              desc: "Avisos operacionais e notícias oficiais.",
              image: pontosManaus,
              to: "/blog",
              cta: "Acessar notícias",
            },
            {
              title: "Treinamentos",
              desc: "Programas de capacitação contínua para a equipe.",
              image: onibusGaragem,
              to: "/blog",
              cta: "Ver agenda",
            },
            {
              title: "Trabalhe Conosco",
              desc: "Envie seu currículo e venha crescer com a gente.",
              image: equipeFoto,
              to: "/trabalhe-conosco",
              cta: "Enviar currículo",
            },
            {
              title: "Nossa Frota",
              desc: "Padrões de manutenção e conforto dos veículos.",
              image: frotaAlinhada,
              to: "/frota",
              cta: "Conhecer frota",
            },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}
