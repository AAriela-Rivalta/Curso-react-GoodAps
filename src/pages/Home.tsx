import { Cover } from "../components/ui/Cover";
import { Cards } from "../components/ui/Cards";

import { useAllProducts } from "../hooks/useAllProducts";

interface Product {
   id: number;
    title: string; 
    description: string;
    price: number;
    discountPercentage: number; // Campo importante de DummyJson
    rating: number; // Puntuación
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[]; // Array de URLs de imágenes
}

export function Home() {
    const { data, isPending } = useAllProducts();

  if (isPending) {
    return (
      <section className='h-[70vh] flex justify-center items-center'>
        <Cover title='Cargando...' />
      </section>
    );  
    }
    return(
        <section className='flex flex-col justify-center items-center p-10'>
            <Cover title='Listado de Productos' />
            
            <div className='flex flex-wrap justify-center gap-5 mt-20'>
                
                {data?.products.map((product: Product) => (
                    <Cards
                        key={product.id}
                        id={product.id}
                        
                        // Utilizamos las props que definiste en Cards.tsx
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        src={product.thumbnail} 
                        
                        // Define la ruta de navegación (ej: /products/1)
                        href={`/products/${product.id}`} 
                    
                        
                    />
                ))}
            </div>
        </section>
    )
}
