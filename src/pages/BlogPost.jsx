import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Post não encontrado</h1>
            <p className="text-gray-300 mb-8">O post que você está procurando não existe.</p>
            <Link to="/blog" className="text-blue-400 hover:text-blue-300 font-medium">
              ← Voltar para Notícias
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Voltar para Notícias
          </Link>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {new Date(post.date).toLocaleDateString('pt-BR')}
              </div>
              
              <h1 className="text-4xl font-bold mb-4 leading-tight text-white">
                {post.title}
              </h1>
              
              {post.cover && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img 
                    src={post.cover} 
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              )}
            </header>

            <div 
              className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-ul:text-gray-300 prose-strong:text-white prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Ver todas as notícias
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}