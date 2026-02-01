import { Instagram, ArrowUpRight } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500',
    type: 'post'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500',
    type: 'story'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=500',
    type: 'post'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500',
    type: 'story'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1539109132314-34a9c655a8c8?q=80&w=500',
    type: 'post'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=500',
    type: 'story'
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <Instagram className="w-5 h-5" />
              <span className="tracking-widest uppercase text-xs">Nosso Instagram</span>
            </div>
            <h2 className="text-3xl font-bold font-serif">Siga @queromaisacessoriosemoda</h2>
          </div>
          <a 
            href="https://www.instagram.com/queromaisacessoriosemoda" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Ver perfil completo
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href="https://www.instagram.com/queromaisacessoriosemoda"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 group relative overflow-hidden transition-all duration-500 ${
              post.type === 'story' 
                ? 'w-40 aspect-[9/16] rounded-3xl border-2 border-primary/20 p-1' 
                : 'w-64 aspect-square rounded-2xl'
            }`}
          >
            <div className={`h-full w-full overflow-hidden ${post.type === 'story' ? 'rounded-[1.4rem]' : 'rounded-2xl'}`}>
              <img
                src={post.image}
                alt="Instagram post"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white w-8 h-8" />
              </div>
            </div>
            {post.type === 'story' && (
              <div className="absolute top-4 left-4">
                <div className="w-8 h-8 rounded-full border border-white p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-secondary" />
                </div>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
