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
}
export function Cards({ id, src, title, description, price, href, showBtn = true, onEdit }: CardsProps) {
  const { mutate, isPending } = useDeleteProducts();

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
      <h1 className='text-base/tight line-clamp-2 mt-3 font-semibold'>{title}</h1>
      
      {/* Descripción (usamos line-clamp para limitar el texto) */}
      <p className='text-sm line-clamp-2 text-gray-600 my-1'>{description}</p>

      {/* Precio */}
      <p className='text-xl font-bold text-blue-700'>
        ${price.toFixed(2)}
      </p>

      {/* Contenedor de botones (posicionado abajo) */}
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