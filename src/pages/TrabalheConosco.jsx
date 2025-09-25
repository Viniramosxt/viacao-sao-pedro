import React, { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Briefcase, TrendingUp, Users, MessageCircle, Upload, FileText, X, CheckCircle2, Phone } from "lucide-react";
import capa from "../assets/trabalhe-conosco.jpeg";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || ""; // ex.: https://api.viacaosaopedro.com

// -------------------- Helpers --------------------
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_MB = 5;

function formatBytes(b) {
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

// -------------------- Dropzone --------------------
function CvDropzone({ file, onFile, error }) {
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);

  function pick() {
    inputRef.current?.click();
  }

  function handleFiles(files) {
    const f = files?.[0];
    if (!f) return;
    if (!ALLOWED_MIME.has(f.type)) {
      onFile(null, "Formato permitido: PDF, DOC, DOCX.");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      onFile(null, `Arquivo até ${MAX_MB}MB.`);
      return;
    }
    onFile(f, null);
  }

  function onChange(e) {
    handleFiles(e.target.files);
  }

  function onDrop(e) {
    e.preventDefault();
    setOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-2">
      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? pick() : null)}
          onClick={pick}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={onDrop}
          className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition 
            ${over ? "border-blue-400 bg-blue-50/50" : "border-gray-400/60 hover:bg-gray-800/20"}`}
          aria-label="Solte o currículo aqui ou clique para selecionar"
        >
          <Upload className="w-8 h-8 mx-auto text-blue-400 mb-2" />
          <p className="text-gray-200 font-medium">Solte o currículo aqui, ou <span className="text-blue-300 underline">clique para selecionar</span></p>
          <p className="text-gray-400 text-sm mt-1">PDF, DOC ou DOCX — até {MAX_MB} MB</p>
          <input
            ref={inputRef}
            id="cv"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between bg-gray-800/60 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
              onClick={() => onFile(null, null)}
              aria-label="Remover arquivo"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              onClick={pick}
              aria-label="Trocar arquivo"
            >
              Trocar
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// -------------------- Página --------------------
export default function TrabalheConosco() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const statusRef = useRef(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    mensagem: "",
    aceita: false, // consentimento LGPD
    hp: "",
  });
  const [cv, setCv] = useState(null);
  const [cvError, setCvError] = useState(null);

  // mock de vagas (troque depois pelo seu backend)
  const vagas = useMemo(() => ([
    { id: "motorista",  titulo: "Motorista Urbano", area: "Operação", tipo: "Efetivo", local: "Manaus/AM" },
    { id: "mecanico",   titulo: "Mecânico", area: "Manutenção", tipo: "Efetivo", local: "Manaus/AM" },
    { id: "aux-admin",  titulo: "Auxiliar Administrativo", area: "Administrativo", tipo: "Jovem Aprendiz", local: "Manaus/AM" },
  ]), []);

  function validate() {
    const err = {};
    if (!form.nome.trim()) err.nome = "Informe seu nome.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) err.email = "Informe seu e-mail.";
    else if (!emailRe.test(form.email.trim())) err.email = "E-mail inválido.";
    if (!cv) err.cv = "Anexe seu currículo (PDF, DOC ou DOCX).";
    if (!form.aceita) err.aceita = "É necessário aceitar o tratamento de dados (LGPD).";
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
      const fd = new FormData();
      fd.append("nome", form.nome);
      fd.append("email", form.email);
      fd.append("telefone", form.telefone || "");
      fd.append("cargo", form.cargo);
      fd.append("mensagem", form.mensagem);
      if (cv) fd.append("cv", cv);

      const res = await fetch(`${API_BASE}/api/apply`, { method: "POST", body: fd });
      if (!res.ok) throw new Error(await res.text());

      setStatus({ type: "ok", msg: "Recebemos sua candidatura. Obrigado!" });
      setForm({ nome: "", email: "", telefone: "", cargo: "", mensagem: "", aceita: false, hp: "" });
      setCv(null);
      setCvError(null);
      setErrors({});
    } catch (err) {
      setStatus({ type: "error", msg: "Não foi possível enviar agora. Tente novamente." });
      console.error("apply error:", err?.message || err);
    } finally {
      setLoading(false);
      setTimeout(() => statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative min-h-[480px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full bg-repeat"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
          </div>

          <div className="relative container mx-auto px-4 py-16 flex items-center">
            <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
              <div className="text-white">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-5">
                  <span className="text-sm font-medium">🚀 Venha fazer parte da equipe</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Sua carreira está <span className="text-yellow-400">ON!</span>
                </h1>
                <p className="text-lg mb-8 text-blue-100 leading-relaxed">
                  Junte-se à Viação São Pedro e construa uma carreira sólida no transporte público.
                  <strong className="text-white"> Oportunidades reais</strong> para crescer.
                </p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">215+</div>
                    <div className="text-sm text-blue-200">Veículos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">41</div>
                    <div className="text-sm text-blue-200">Linhas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">13+</div>
                    <div className="text-sm text-blue-200">Anos</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => document.getElementById("formulario").scrollIntoView({ behavior: "smooth" })}
                    className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Enviar Currículo
                  </button>
                  <Link
                    to="/empresa"
                    className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm text-center"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative">
                  <img src={capa} alt="Trabalhe na São Pedro" className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" />
                  <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-blue-900 p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold">2.3M+</div>
                    <div className="text-sm font-medium">Passageiros/mês</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="bg-gray-50 py-14">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Por que trabalhar conosco?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Oferecemos mais que um emprego — oferecemos uma carreira com propósito e crescimento.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Estabilidade</h3>
                <p className="text-gray-600">Empresa consolidada há mais de 13 anos com crescimento contínuo.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crescimento</h3>
                <p className="text-gray-600">Oportunidades reais de desenvolvimento e progressão de carreira.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ambiente</h3>
                <p className="text-gray-600">Equipe colaborativa e ambiente respeitoso e profissional.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vagas abertas (mock) */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vagas abertas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {vagas.map((v) => (
                <div key={v.id} className="border rounded-xl p-5 hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">{v.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">{v.area} • {v.tipo}</p>
                  <p className="text-sm text-gray-500">{v.local}</p>
                  <button
                    onClick={() => {
                      setForm((f) => ({ ...f, cargo: v.titulo }));
                      document.getElementById("formulario").scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    Candidatar-se
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="formulario" className="bg-black py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-3">Candidate-se agora</h2>
                <p className="text-gray-300">Preencha o formulário e envie seu currículo. O RH retornará em breve.</p>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 lg:p-12">
                {status && (
                  <div
                    ref={statusRef}
                    role="status"
                    aria-live="polite"
                    className={`mb-6 rounded-md p-3 text-sm ${
                      status.type === "ok"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {status.msg}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {/* honeypot */}
                  <input id="hp" value={form.hp} onChange={(e)=>setForm({ ...form, hp: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label htmlFor="nome" className="block text-gray-300 font-medium">Nome completo *</label>
                      <input
                        id="nome"
                        value={form.nome}
                        onChange={(e)=>setForm({ ...form, nome: e.target.value })}
                        className={`w-full p-3 border rounded-lg bg-white ${errors.nome ? "border-red-400" : "border-gray-300"}`}
                        placeholder="Seu nome"
                        required
                        aria-invalid={!!errors.nome}
                      />
                      {errors.nome && <p className="text-xs text-red-500">{errors.nome}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-gray-300 font-medium">E-mail *</label>
                      <input
                        id="email" type="email"
                        value={form.email}
                        onChange={(e)=>setForm({ ...form, email: e.target.value })}
                        className={`w-full p-3 border rounded-lg bg-white ${errors.email ? "border-red-400" : "border-gray-300"}`}
                        placeholder="voce@exemplo.com"
                        required
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label htmlFor="telefone" className="block text-gray-300 font-medium">Telefone (opcional)</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="telefone"
                          value={form.telefone}
                          onChange={(e)=>setForm({ ...form, telefone: e.target.value })}
                          className="w-full p-3 pl-9 border rounded-lg bg-white border-gray-300"
                          placeholder="(92) 9 0000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="cargo" className="block text-gray-300 font-medium">Cargo de interesse</label>
                      <input
                        id="cargo"
                        value={form.cargo}
                        onChange={(e)=>setForm({ ...form, cargo: e.target.value })}
                        className="w-full p-3 border rounded-lg bg-white border-gray-300"
                        placeholder="Ex.: Motorista, Mecânico, Aux. ADM…"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="mensagem" className="block text-gray-300 font-medium">Mensagem (opcional)</label>
                    <textarea
                      id="mensagem" rows={5}
                      value={form.mensagem}
                      onChange={(e)=>setForm({ ...form, mensagem: e.target.value })}
                      className="w-full p-3 border rounded-lg bg-white border-gray-300"
                      placeholder="Conte um pouco sobre você…"
                    />
                  </div>

                  {/* Dropzone */}
                  <div className="space-y-1">
                    <label className="block text-gray-300 font-medium">Currículo (PDF, DOC, DOCX) — até {MAX_MB}MB *</label>
                    <CvDropzone
                      file={cv}
                      error={errors.cv || cvError}
                      onFile={(f, err) => { setCv(f); setCvError(err); if (err) setErrors((e) => ({ ...e, cv: err })); else setErrors((e) => ({ ...e, cv: null })); }}
                    />
                  </div>

                  {/* LGPD */}
                  <div className="flex items-start gap-3">
                    <input
                      id="aceita"
                      type="checkbox"
                      checked={form.aceita}
                      onChange={(e)=>setForm({ ...form, aceita: e.target.checked })}
                      className="mt-1"
                      required
                    />
                    <label htmlFor="aceita" className="text-gray-300 text-sm">
                      Autorizo o tratamento dos meus dados pessoais e currículo para fins de recrutamento (LGPD).
                    </label>
                  </div>
                  {errors.aceita && <p className="text-xs text-red-500">{errors.aceita}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando…" : "Enviar candidatura"}
                  </button>
                </form>

                {/* Contato direto */}
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl border border-blue-500 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    <span className="text-yellow-400">Atendimento ON!</span> Via WhatsApp
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Dúvidas sobre vagas e processo seletivo? Fale com o RH.
                  </p>
                  <a
                    href="https://wa.me/5592992344255?text=Olá! Gostaria de saber sobre oportunidades de trabalho na Viação São Pedro."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" />
                    (92) 99234-4255
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pronto para fazer a diferença?</h3>
            <p className="text-gray-800 mb-5">Conecte pessoas, mova a cidade e cresça com a gente.</p>
            <button
              onClick={() => document.getElementById("formulario").scrollIntoView({ behavior: "smooth" })}
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all transform hover:scale-105"
            >
              Enviar meu currículo agora
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
