import { posts } from "../data/posts";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Blog() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Notícias</h1>
          <p className="text-gray-300 text-center mb-12 text-lg">
            Fique por dentro das novidades da Viação São Pedro
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map(post => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`} 
                className="border border-gray-700 bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-500 transition-all duration-300 group"
              >
                {post.cover && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={post.cover} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                    Ler mais →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}