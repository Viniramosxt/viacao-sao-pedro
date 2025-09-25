import React from "react";
import { Link } from "react-router-dom";

export default function FeatureGrid({ items = [] }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(({ title, desc, icon: Icon, to, href, cta }, i) => {
          const Card = (
            <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 h-full">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Icon className="h-6 w-6 text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-300">{desc}</p>
              </div>
              <div className="px-6 pb-6">
                <span className="text-blue-400 hover:text-blue-300 font-medium">
                  {cta} →
                </span>
              </div>
            </div>
          );
          
          return to ? (
            <Link key={i} to={to} className="block">{Card}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="block">{Card}</a>
          );
        })}
      </div>
    </div>
  );
}