import React from "react";
import { Link } from "react-router-dom";

export default function FeatureGridImage({ items = [] }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(({ title, desc, image, to, href, cta }, i) => {
          const Card = (
            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all">
              <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1 drop-shadow">{title}</h3>
                <p className="text-gray-200 text-sm line-clamp-2">{desc}</p>
                <span className="inline-block mt-3 text-sm font-medium text-white/90 bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1 rounded">
                  {cta} →
                </span>
              </div>
            </div>
          );
          
          return to ? (
            <Link key={i} to={to}>{Card}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noreferrer">{Card}</a>
          );
        })}
      </div>
    </div>
  );
}