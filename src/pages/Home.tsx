import {  useState } from "react";
import { Cards } from "../components/ui/Cards";
import { Cover } from "../components/ui/Cover";
import { EditForm } from "../components/ui/EditForm";

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
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { data, isPending } = useAllProducts();

  if (isPending) {
    return (
      <section className='h-[70vh] flex justify-center items-center'>
        <Cover title='Cargando...' />
      </section>
    );  
    }
    return(
        <>
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
                        rating={product.rating}
                        
                        // Define la ruta de navegación (ej: /products/1)
                        href={`/products/${product.id}`} 

                        showBtn={true}
                        onEdit={() => {
                        setSelectedProduct(product);
                        setOpen(true);
                        }} 
                    />
                ))}
            </div>
        </section>
        {open && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-2xl flex flex-col justify-center items-center">
            <EditForm
              id={selectedProduct.id}
              initialData={{
                title: selectedProduct.title,
                description: selectedProduct.description,
                category: selectedProduct.category,
                price: selectedProduct.price,
                
                // === AÑADIR PROPIEDADES FALTANTES ===
                discountPercentage: selectedProduct.discountPercentage,
                rating: selectedProduct.rating,
                stock: selectedProduct.stock,
                brand: selectedProduct.brand,
                // ==================================
                
                thumbnail: selectedProduct.thumbnail,
              }}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
        </>
    )
}
