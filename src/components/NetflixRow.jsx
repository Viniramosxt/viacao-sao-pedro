import React, { useRef, useState } from "react";

export default function NetflixRow({ title = "Em alta", items = [] }) {
  const scrollerRef = useRef(null);
  const videoRefs = useRef([]);
  const [hover, setHover] = useState(null);

  const scrollByCards = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? (card.clientWidth + 16) * 3 : 960; // 3 cards
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onEnter = (i, it) => {
    if (it.type !== "video") return;
    setHover(i);
    const v = videoRefs.current[i];
    if (v) {
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  };
  const onLeave = (i, it) => {
    if (it.type !== "video") return;
    setHover(null);
    const v = videoRefs.current[i];
    if (v) { v.pause(); v.muted = true; }
  };

  // Acessibilidade: teclado na área do carrossel
  const onKey = (e) => {
    if (e.key === "ArrowRight") scrollByCards(1);
    if (e.key === "ArrowLeft")  scrollByCards(-1);
  };

  // Suporte a drag com mouse/touch
  let isDown = false, startX = 0, startLeft = 0;
  const dragStart = (e) => {
    isDown = true;
    startX = (e.touches ? e.touches[0].pageX : e.pageX);
    startLeft = scrollerRef.current.scrollLeft;
  };
  const dragMove = (e) => {
    if (!isDown) return;
    const x = (e.touches ? e.touches[0].pageX : e.pageX);
    scrollerRef.current.scrollLeft = startLeft - (x - startX);
  };
  const dragEnd = () => { isDown = false; };

  return (
    <section className="relative group">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
      </div>

      {/* setas */}
      <button
        aria-label="Anterior"
        onClick={() => scrollByCards(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white w-12 h-12 rounded-full
                   hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        aria-label="Próximo"
        onClick={() => scrollByCards(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white w-12 h-12 rounded-full
                   hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* fades nas laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-20"/>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-20"/>

      <div
        className="px-6 md:px-12"
        onKeyDown={onKey}
        tabIndex={0}
      >
        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          onMouseDown={dragStart}
          onMouseMove={dragMove}
          onMouseLeave={dragEnd}
          onMouseUp={dragEnd}
          onTouchStart={dragStart}
          onTouchMove={dragMove}
          onTouchEnd={dragEnd}
        >
          {items.map((it, i) => (
            <article
              key={i}
              data-card
              className="relative snap-start shrink-0 w-[280px] md:w-[300px] cursor-pointer"
              onMouseEnter={() => onEnter(i, it)}
              onMouseLeave={() => onLeave(i, it)}
            >
              {/* número grande */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 select-none">
                <span
                  className="text-7xl md:text-8xl font-black text-white"
                  style={{ WebkitTextStroke: '4px #1f2937', textShadow: '6px 6px 12px rgba(0,0,0,.9)' }}
                >
                  {i + 1}
                </span>
              </div>

              {/* card */}
              <div className="ml-8 bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:scale-[1.02] transition will-change-transform">
                <div className="relative" style={{ aspectRatio: '9/16' }}>
                  {it.type === 'video' ? (
                    <>
                      <img
                        src={it.poster}
                        alt={it.title}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${hover === i ? 'opacity-0' : 'opacity-100'}`}
                        loading="lazy"
                      />
                      <video
                        ref={(el) => (videoRefs.current[i] = el)}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hover === i ? 'opacity-100' : 'opacity-0'}`}
                        muted={hover !== i}
                        playsInline
                        loop
                      >
                        <source src={it.src} type="video/mp4" />
                      </video>
                    </>
                  ) : (
                    <img src={it.src} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
                  )}

                  {/* gradiente e textos */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">VSP</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{it.title}</h3>
                    <p className="text-gray-300 text-sm opacity-90">{it.description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}