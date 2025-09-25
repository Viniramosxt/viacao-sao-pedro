// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ---------- ENV ----------
const envBool = (v) => String(v).trim().toLowerCase() === 'true';

const HOST      = (process.env.SMTP_HOST || '').trim();           // vsp.viacaosaopedro.com
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);           // 587 (STARTTLS) ou 465 (SSL)
const SECURE    = envBool(process.env.SMTP_SECURE ?? (SMTP_PORT === 465));
const USER   = (process.env.SMTP_USER || '').trim();           // vinicius@viacaosaopedro.com
const PASS   = (process.env.SMTP_PASS || '').trim();           // senha da caixa

const MAIL_FROM = (process.env.MAIL_FROM || USER).trim();      // remetente do seu domínio
const MAIL_TO   = (process.env.MAIL_TO   || USER).trim();      // destinatário (sua própria caixa)

// ---------- ENV extra ----------
const BRAND_NAME   = (process.env.BRAND_NAME || 'Viação São Pedro').trim();
const BRAND_PRIMARY = (process.env.BRAND_PRIMARY || '#0f5bd6').trim();
const LOGO_MAX_H   = Number(process.env.LOGO_MAX_H || 48); // altura máxima da logo

// resolver caminho da logo (relativo ao server.js)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.resolve(__dirname, process.env.LOGO_PATH || './src/assets/logo.png');
const HAS_LOGO = fs.existsSync(LOGO_PATH);

// anexo inline (cid) da logo
const logoAttachment = HAS_LOGO ? [{
  filename: path.basename(LOGO_PATH),
  path: LOGO_PATH,
  cid: 'logo@vsp' // referenciado no HTML
}] : [];

console.log('🚀 SERVER INICIADO');
console.log('🎨 BRAND CFG =>', { name: BRAND_NAME, primary: BRAND_PRIMARY, logoHeight: `${LOGO_MAX_H}px`, logo: HAS_LOGO ? LOGO_PATH : 'NONE' });
console.log('SMTP CFG =>', {
  host: HOST,
  port: SMTP_PORT,
  secure: SECURE,
  user: USER,
  pass_len: PASS.length,
  from: MAIL_FROM,
  to: MAIL_TO
});

// ---------- TRANSPORT ----------
const transporter = nodemailer.createTransport({
  host: HOST,
  port: SMTP_PORT,
  secure: SECURE,                 // false para 587 (STARTTLS), true para 465 (SSL)
  auth: { user: USER, pass: PASS },
  requireTLS: true,
  tls: { minVersion: 'TLSv1.2' },
});

// validação do SMTP na subida
transporter.verify((err, ok) => {
  if (err) {
    console.error('❌ SMTP VERIFY ERROR:', err.message);
  } else {
    console.log('✅ SMTP READY');
  }
});

// ---------- TEMPLATE COM CORES AZUL/BRANCO/PRETO ----------
function wrapEmail(innerHtml) {
  return `
  <table width="100%" bgcolor="#f5f7fb" style="margin:0;padding:24px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <tr>
          <td style="background:${BRAND_PRIMARY};padding:16px 20px">
            ${HAS_LOGO
              ? `<img src="cid:logo@vsp" alt="${BRAND_NAME}" style="display:block;max-height:${LOGO_MAX_H}px">`
              : `<div style="color:#fff;font-weight:700;font-size:18px">${BRAND_NAME}</div>`}
          </td>
        </tr>
        <tr>
          <td style="padding:24px;color:#111827">
            ${innerHtml}
          </td>
        </tr>
        <tr>
          <td style="background:#0b235a;color:#ffffff;padding:12px 20px;font-size:12px">
            © ${new Date().getFullYear()} ${BRAND_NAME}. Este é um e-mail automático.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>`;
}

// ---------- HELPERS ----------
// Utilitários para formatação
function humanSize(bytes) {
  const u = ['B','KB','MB','GB']; let i = 0;
  while (bytes >= 1024 && i < u.length - 1) { bytes /= 1024; i++; }
  return `${bytes.toFixed(i ? 2 : 0)} ${u[i]}`;
}

function esc(s=''){
  return String(s).replace(/[&<>"]/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[m]));
}

function buildHtmlContact({ nome, email, assunto, mensagem }) {
  const inner = `
    <h2 style="margin:0 0 8px">Novo contato do site</h2>
    <p><b>Nome:</b> ${esc(nome)}</p>
    <p><b>E-mail:</b> ${esc(email)}</p>
    <p><b>Assunto:</b> ${esc(assunto || '-')}</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
    <pre style="white-space:pre-wrap;margin:0">${esc(mensagem || '')}</pre>
  `;
  return wrapEmail(inner);
}

function buildHtmlApply({ nome, email, cargo, mensagem, file }) {
  const inner = `
    <h2 style="margin:0 0 8px">Nova candidatura – Trabalhe Conosco</h2>
    <p><b>Nome:</b> ${esc(nome)}</p>
    <p><b>E-mail:</b> ${esc(email)}</p>
    <p><b>Cargo:</b> ${esc(cargo || '-')}</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
    ${mensagem ? `<pre style="white-space:pre-wrap;margin:0">${esc(mensagem)}</pre>` : ''}
    <div style="margin-top:16px;padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">
      <b>📎 Anexo:</b> ${esc(file.originalname)} — ${humanSize(file.size)}
      <div style="font-size:12px;color:#6b7280;margin-top:4px">O currículo está anexado abaixo deste e-mail.</div>
    </div>
  `;
  return wrapEmail(inner);
}

// ---------- ROTAS ----------
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/ready', (_req, res) => {
  transporter.verify((err) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true });
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { nome, email, assunto, mensagem, hp } = req.body || {};

    // honeypot anti-bot
    if (hp) return res.status(204).end();

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    console.log('📨 Enviando e-mail…', { to: MAIL_TO, from: MAIL_FROM, replyTo: email });

    const info = await transporter.sendMail({
      from: `"Site ${BRAND_NAME}" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: `Contato do site: ${assunto || '(sem assunto)'}`,
      text: `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto || '-'}\n\n${mensagem || ''}`,
      html: buildHtmlContact({ nome, email, assunto, mensagem }),
      attachments: [...logoAttachment], // <-- logo inline
    });

    console.log('✅ E-MAIL ENVIADO! MessageID:', info.messageId, '| Response:', info.response);
    res.json({ ok: true });
  } catch (e) {
    console.error('❌ MAIL ERROR:', e);
    res.status(500).json({ error: 'Falha ao enviar e-mail.' });
  }
});

// === upload em memória (limite 5MB) ===
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// util para validar mimetypes
const ALLOWED = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

// ---------- NOVA ROTA: candidatura ----------
app.post('/api/apply', upload.single('cv'), async (req, res) => {
  try {
    const { nome, email, cargo, mensagem, hp } = req.body || {};
    if (hp) return res.status(204).end(); // honeypot
    if (!nome || !email) return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });

    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Anexe seu currículo.' });
    if (!ALLOWED.has(file.mimetype)) return res.status(400).json({ error: 'Formato permitido: PDF, DOC, DOCX.' });

    console.log('📄 NOVA CANDIDATURA:', { nome, email, cargo, arquivo: file.originalname, tamanho: `${(file.size/1024/1024).toFixed(2)}MB` });

    const attachments = [
      ...logoAttachment,
      {
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      },
    ];

    const info = await transporter.sendMail({
      from: `"Trabalhe Conosco – ${BRAND_NAME}" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: `Candidatura: ${nome}${cargo ? ' – ' + cargo : ''}`,
      text: `Nome: ${nome}\nEmail: ${email}\nCargo: ${cargo || '-'}\n\n${mensagem || ''}\n\nAnexo: ${file.originalname} (${humanSize(file.size)})`,
      html: buildHtmlApply({ nome, email, cargo, mensagem, file }),
      attachments,
    });

    console.log('✅ CANDIDATURA ENVIADA! MessageID:', info.messageId);
    res.json({ ok: true });
  } catch (e) {
    console.error('❌ APPLY ERROR:', e);
    res.status(500).json({ error: 'Falha ao enviar candidatura.' });
  }
});

// ---------- START ----------
const SERVER_PORT = Number(process.env.PORT || 3001);
app.listen(SERVER_PORT, () => console.log(`🌐 Contact API ouvindo na porta :${SERVER_PORT}`));
