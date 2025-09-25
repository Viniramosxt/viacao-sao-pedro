# 🚌 Viação São Pedro - Website Institucional

Website oficial da Viação São Pedro, empresa de transporte coletivo de Manaus/AM. Plataforma moderna com sistema de blog, trabalhe conosco e carrossel estilo Netflix.

## ✨ Funcionalidades

### 🎯 Frontend (React + Vite)
- **Design Moderno**: Interface escura com acentos azuis e brancos
- **Carrossel Netflix**: Navegação por imagens/vídeos com controles profissionais
- **Páginas Dinâmicas**: Home, Empresa, Frota, Blog e Trabalhe Conosco
- **Sistema de Roteamento**: Navegação SPA com React Router
- **Responsivo**: Design adaptável para desktop e mobile
- **Componentes Modulares**: Arquitetura reutilizável e escalável

### 🔧 Backend (Node.js + Express)
- **API REST**: Endpoints para contato e envio de currículos
- **Sistema de Email**: Integração com SMTP personalizado
- **Upload de Arquivos**: Processamento de currículos (PDF, DOC, DOCX)
- **Templates HTML**: Emails profissionais com logo da empresa
- **Validação de Dados**: Sanitização e validação de formulários
- **Middleware de Segurança**: CORS e limitação de uploads

### 📧 Sistema de Email
- **SMTP Customizado**: Configuração flexível via .env
- **Templates Profissionais**: Design responsivo com branding
- **Anexos Suportados**: Currículos até 5MB
- **Notificações**: Confirmações automáticas para usuários

## 🛠️ Stack Tecnológica

### Frontend
- **React 18.2.0** - Biblioteca principal
- **Vite** - Build tool e dev server
- **React Router 6.28.0** - Roteamento SPA
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **Lucide React** - Ícones modernos e consistentes

### Backend
- **Node.js** - Runtime JavaScript
- **Express 5.1.0** - Framework web
- **Nodemailer 7.0.6** - Sistema de envio de emails
- **Multer 2.0.2** - Upload e processamento de arquivos
- **CORS 2.8.5** - Middleware de segurança

### Desenvolvimento
- **ESLint** - Linter e formatação de código
- **PostCSS + Autoprefixer** - Processamento de CSS
- **dotenv** - Gerenciamento de variáveis de ambiente

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm** (vem com Node.js) ou **yarn**
- **Git** para clonagem

### 1. Clonar o Repositório
```bash
git clone https://github.com/Viniramosxt/viacao-sao-pedro.git
cd viacao-sao-pedro
```

### 2. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# SMTP Configuration
SMTP_HOST=seu-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@empresa.com
SMTP_PASS=sua-senha-smtp

# Email Settings
MAIL_FROM=seu-email@empresa.com
MAIL_TO=destino@empresa.com

# Server Configuration
PORT=3001

# Branding
LOGO_PATH=./src/assets/logo-white.png
LOGO_MAX_H=70
BRAND_NAME=Viação São Pedro
BRAND_PRIMARY=#0f5bd6
```

### 4. Executar em Desenvolvimento

**Terminal 1 - Frontend (Vite):**
```bash
npm run dev
```
Acesse: http://localhost:5173

**Terminal 2 - Backend (Express):**
```bash
node server.js
```
API executando em: http://localhost:3001

### 5. Build para Produção
```bash
npm run build
```
Os arquivos otimizados ficam em `dist/`

## 📁 Estrutura do Projeto

```
viacao-sao-pedro/
├── public/
│   ├── favicon.png
│   └── vite.svg
├── src/
│   ├── assets/          # Imagens, logos, recursos
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── NetflixRow.jsx
│   │   ├── FeatureGrid.jsx
│   │   └── FeatureGridImage.jsx
│   ├── pages/           # Páginas da aplicação
│   │   ├── home.jsx
│   │   ├── Empresa.jsx
│   │   ├── Frota.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── FaleConosco.jsx
│   │   └── TrabalheConosco.jsx
│   ├── data/            # Dados estáticos
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── server.js            # Servidor Express
├── .env                 # Configurações (não commitado)
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
├── tailwind.config.js   # Configuração do Tailwind
└── README.md
```

## 🎨 Características do Design

### Tema Escuro Profissional
- **Fundo Principal**: Preto (#000000)
- **Cards/Componentes**: Cinza escuro (#1F2937)
- **Bordas**: Cinza médio (#374151)
- **Texto Principal**: Branco (#FFFFFF)
- **Texto Secundário**: Cinza claro (#D1D5DB)
- **Acentos**: Azul (#3B82F6) e variações

### Componentes Destacados
- **Hero Section**: Imagem de fundo com gradiente overlay
- **Netflix Carousel**: Scroll suave, controles intuitivos
- **Feature Cards**: Hover effects e transições suaves
- **Forms**: Validação em tempo real e feedback visual

## 📧 Sistema de Email

### Recursos
- **Templates Responsivos**: Design profissional com logo
- **Múltiplos Destinatários**: Configuração flexível
- **Anexos Seguros**: Validação de tipo e tamanho
- **Logs Detalhados**: Monitoramento de envios

### Endpoints da API
```javascript
POST /api/contact        # Formulário de contato
POST /api/apply          # Envio de currículo
```

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (Vite)
npm run build    # Build de produção
npm run preview  # Preview do build
node server.js   # Servidor Express (API)
```

## 🌐 Deploy

### Frontend (Vite Build)
1. Execute `npm run build`
2. Deploy a pasta `dist/` para seu servidor web
3. Configure redirecionamento SPA para `index.html`

### Backend (Node.js)
1. Configure as variáveis de ambiente no servidor
2. Execute `npm install --production`
3. Inicie com `node server.js` ou use PM2
4. Configure proxy reverso (Nginx/Apache) se necessário

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Viação São Pedro. Todos os direitos reservados.

## 📞 Suporte

Para dúvidas técnicas ou suporte:
- **Email**: vinicius@viacaosaopedro.com
- **Telefone**: (92) 99158-1128

---

**Desenvolvido com ❤️ para conectar pessoas em Manaus/AM**
