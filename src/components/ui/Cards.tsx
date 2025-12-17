import { useState, useEffect } from 'react'; // <-- ¡IMPORTAR ESTO!
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useDeleteProducts } from '../../hooks/useDeleteProducts';

interface CardsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  src: string;
  href: string;
  showBtn?: boolean;
  onEdit?: () => void;
  rating: number;
}
export function Cards({ id, src, title, description, price, href, showBtn = true, onEdit, rating }: CardsProps) {
  const { mutate, isPending } = useDeleteProducts();
  
  // 1. ESTADO: Estado para el valor animado del rating (inicialmente en 0)
  const [animatedRating, setAnimatedRating] = useState(0);

  // 2. EFECTO: Lógica del contador animado
  useEffect(() => {
    let startTime: number;
    const duration = 1000; // Duración de la animación en milisegundos (0.8 segundos)
    const startValue = 0;
    const endValue = rating;

    // Función que se ejecuta en cada frame de la animación
    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // Progreso de 0 a 1

      // Calcula el valor actual interpolando
      const currentValue = startValue + (endValue - startValue) * progress;
      
      setAnimatedRating(currentValue);

      // Si el progreso es menor que 1, solicita el siguiente frame
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Inicia la animación
    const animationFrameId = requestAnimationFrame(animate);

    // Función de limpieza para cancelar la animación si el componente se desmonta
    return () => cancelAnimationFrame(animationFrameId);
  }, [rating]); // Se ejecuta al montar y si 'rating' cambia

  function handleDelete(id: number) {
    mutate(id, {
      onSuccess: () => {
        toast.success("Producto eliminado con éxito");
      },
      onError: (error) => {
        toast.error("Error al eliminar el producto");
        console.error("Error al eliminar el producto:", error);
      }
    });
  }

//Renderizado enfocado en mostrar la información
  return (
    <div className='flex flex-col items-center w-72 h-96 text-center border rounded-4xl p-5 relative'>
      
      {/* Imagen del producto */}
      <img 
        src={src} 
        alt={title} 
        className='w-44 h-44 object-contain' 
      />
      
      {/* Título */}
      <h1 className='text-base/tight line-clamp-2 mt-3 font-bold'>{title}</h1>
      
      {/* Descripción*/}
      <p className='text-sm line-clamp-2 text-gray-600 my-1'>{description}</p>
      
      <div className='flex flex-row justify-between items-center w-full px-5 mt-2'>
        {/* Precio */}
        <p className='text-2xl font-bold text-blue-700'>
          ${price.toFixed(2)}
        </p>

        {/* Rating (Usando el valor animado) */}
        <div className='flex items-center text-sm text-yellow-500 mt-2'>
            <span role="img" aria-label="Rating Star" className='mr-1'>⭐</span>
            <span className='font-semibold text-yellow-600'>
                {animatedRating.toFixed(2)} {/*mostrar valor animado */}
            </span>
        </div>
      </div>
      

      {/* Contenedor de botones*/}
      <div className='flex gap-3 absolute bottom-5'>
        {/* Botón Eliminar */}
        {showBtn && (
            <button
              className='bg-red-400 p-2 rounded-md cursor-pointer disabled:opacity-50'
              onClick={() => handleDelete(id)}
              disabled={isPending}
            >
              {isPending ? 'Borrando...' : 'Borrar'}
            </button>
          )}

        {/* Botón Ver producto (Usando Link de react-router-dom) */}
        <Link
          to={href} // Aquí se usa la prop href (ej: /products/1)
          className='bg-green-400 p-2 rounded-md cursor-pointer hover:bg-green-500 transition duration-150'
        >
          Ver producto
        </Link>
        {/*Editar produto */}
        <button
            className='bg-yellow-400 p-2 rounded-md cursor-pointer'
            onClick={onEdit}
          >
            Editar
          </button>


      </div>
    </div>
  );
}