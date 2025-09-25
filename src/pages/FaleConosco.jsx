import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import pontosManaus from '../assets/pontos-turisticos.jpg';

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || ''; // ex.: https://api.viacaosaopedro.com

export default function FaleConosco() {
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '', hp: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // {type:'ok'|'error', msg:string}
  const [errors, setErrors] = useState({});
  const statusRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  function validate() {
    const err = {};
    if (!form.nome?.trim()) err.nome = 'Informe seu nome.';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email?.trim()) err.email = 'Informe seu e-mail.';
    else if (!emailRe.test(form.email.trim())) err.email = 'E-mail inválido.';
    if (form.mensagem && form.mensagem.trim().length > 0 && form.mensagem.trim().length < 5) {
      err.mensagem = 'Mensagem muito curta.';
    }
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.hp) return; // honeypot
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    setStatus(null);
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000);

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: ctrl.signal,
      });
      clearTimeout(t);

      if (!res.ok) throw new Error(await res.text());

      setStatus({ type: 'ok', msg: 'Mensagem enviada! Em breve retornaremos.' });
      setForm({ nome: '', email: '', assunto: '', mensagem: '', hp: '' });
      setErrors({});
    } catch (err) {
      setStatus({ type: 'error', msg: 'Não foi possível enviar agora. Tente novamente.' });
      console.error('FaleConosco error:', err?.message || err);
    } finally {
      setLoading(false);
      setTimeout(() => statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Banner */}
        <div className="relative h-[250px] md:h-[300px] overflow-hidden">
          <img
            src={pontosManaus}
            alt="Pontos turísticos de Manaus"
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 w-full p-8">
              <h1 className="text-4xl font-bold text-white text-center mb-4">Fale Conosco</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
              <p className="text-center text-lg mb-8 text-gray-300">
                Quer trabalhar conosco? Envie seu currículo para<br />
                <span className="text-blue-400 font-semibold">vinicius@viacaosaopedro.com</span>
              </p>

              {status && (
                <div
                  ref={statusRef}
                  role="status"
                  aria-live="polite"
                  className={`mb-6 rounded-md p-3 text-sm ${status.type === 'ok'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                >
                  {status.msg}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {/* honeypot anti-bot */}
                <input id="hp" value={form.hp} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />

                <div className="space-y-1">
                  <label className="block text-gray-300 font-medium" htmlFor="nome">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.nome ? 'border-red-400' : 'border-gray-300'}`}
                    required
                  />
                  {errors.nome && <p className="text-xs text-red-600">{errors.nome}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-300 font-medium" htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="voce@exemplo.com"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                    required
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-300 font-medium" htmlFor="assunto">Assunto</label>
                  <input
                    type="text"
                    id="assunto"
                    value={form.assunto}
                    onChange={handleChange}
                    placeholder="Ex.: Vaga Motorista / Dúvida / Sugestão"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-300 font-medium" htmlFor="mensagem">Mensagem</label>
                  <textarea
                    id="mensagem"
                    rows="5"
                    value={form.mensagem}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem…"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.mensagem ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {errors.mensagem && <p className="text-xs text-red-600">{errors.mensagem}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando…' : 'Enviar Mensagem'}
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
