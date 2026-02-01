import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Roupas',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000',
    id: 'roupas',
  },
  {
    title: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000',
    id: 'acessorios',
  },
];

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="group relative h-64 overflow-hidden rounded-2xl"
          >
            <img
              src={category.image}
              alt={category.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="mb-1 text-2xl font-bold font-serif">{category.title}</h3>
              <div className="flex items-center text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                Ver Coleção <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}