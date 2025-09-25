import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  // Endereço (apenas esse texto visível) + link exato do Maps
  const addrText =
    'R. do Riacho Ecológico, n° 682 - Tarumã Açu, Manaus - AM, 69024-160';
  const addrUrl =
    'https://www.google.com/maps/place/Via%C3%A7%C3%A3o+S%C3%A3o+Pedro+Ltda/@-2.9774462,-60.0542779,20z/data=!4m10!1m2!2m1!1zdmlhw6fDo28gc8OjbyBwZWRybw!3m6!1s0x926c108d821e3b7f:0xeb5f9ac444717f45!8m2!3d-2.9774689!4d-60.0542823!15sChN2aWHDp8OjbyBzw6NvIHBlZHJvkgEQdHJ1Y2tpbmdfY29tcGFueaoBVhABKhciE3ZpYcOnw6NvIHPDo28gcGVkcm8oDDIgEAEiHD1tgMP-xwYsAL0lIteAvSArMFyK3MlCC_HVO4IyFxACIhN2aWHDp8OjbyBzw6NvIHBlZHJv4AEA!16s%2Fg%2F11cfh_k0p?entry=ttu&g_ep=EgoyMDI1MDkyMS4wIKXMDSoASAFQAw%3D%3D';

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10 grid gap-10 md:grid-cols-3">
        {/* Atendimento (RH) */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-blue-400">
            ATENDIMENTO (RH)
          </h3>
          <div className="mt-3 space-y-2">
            <a
              href="mailto:recrutamento@viacaosaopedro.com"
              className="block hover:text-white"
            >
              recrutamento@viacaosaopedro.com
            </a>
            <p className="text-sm text-gray-400">
              Seg–Qui: 08:00–12:00 • 13:00–17:30<br />
              Sex: 08:00–12:00 • 13:00–17:00
            </p>
          </div>
        </div>

        {/* Contatos */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-blue-400">
            CONTATOS
          </h3>
          <div className="mt-3 space-y-2">
            <a href="tel:+559236543121" className="block hover:text-white">
              (92) 3654-3121
            </a>
            <a
              href="mailto:contabilidade@viacaosaopedro.com"
              className="block hover:text-white"
            >
              contabilidade@viacaosaopedro.com
            </a>
          </div>
        </div>

        {/* Empresa / Endereço (somente o endereço como link) */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-blue-400">
            EMPRESA
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <p>Razão Social: Viação São Pedro LTDA</p>
            <p>CNPJ: 17.256.249/0002-46</p>
            <address className="not-italic">
              <a
                href={addrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
                title="Abrir no Google Maps"
              >
                {addrText}
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-gray-400">
          © {year} Viação São Pedro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
