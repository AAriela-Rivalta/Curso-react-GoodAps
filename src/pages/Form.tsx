import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useCreateProducts } from "../hooks/useCreateProducts";
import { useUserStore } from '../store/useUserStore';

const productSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    price: z.number().min(1, 'El precio debe ser mayor o igual a 0.1'),
    discountPercentage: z.number().min(0).max(100, 'El porcentaje de descuento debe estar entre 0 y 100'),
    rating: z.number().min(0).max(5, 'La calificación debe estar entre 0 y 5'),
    stock: z.number().min(0, 'El stock no puede ser negativo'),
    brand: z.string().min(2, 'La marca debe tener al menos 2 caracteres'),
    category: z.string().min(3, 'La categoría debe tener al menos 3 caracteres'),
    thumbnail: z.string().url('La miniatura debe ser una URL válida'),
});

type ProductFormData = z.infer<typeof productSchema>;

export function Form() {
    const { mutate, isPending } = useCreateProducts();
    const userWithZustand = useUserStore(state => state.user);

 const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
        description: '',
        price: 0.1,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '', //Valor inicial: array con un string vacio
    }
  });

  

  function onSubmit(body: ProductFormData) {
    mutate(body, {
      onSuccess: () => {
        toast.success('Producto creado')
        reset();
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Ocurrió un error al crear el producto';

        toast.error(message)
      },
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Nuevo Producto</h2>
                    <p className="text-gray-600 mt-2">Completa el formularios con validación Zod + React Hook Form</p>
                     <p className="text-gray-900 mt-2">Hola{userWithZustand.username}</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Título */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Título *
                        </label>
                        <input 
                            type="text"
                            id="title"
                            {...register("title")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nombre del producto"
                        />
                        {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                         )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción *
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            {...register("description")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="Describe el producto detalladamente..."
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Precio */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                            Precio *
                        </label>
                        <input 
                            type="number"
                            id="price"
                            step="0.01"
                            {...register("price", { valueAsNumber: true })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="100.00"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Discount Percentage */}
                    <div>
                        <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-2">
                            % Descuento
                        </label>
                        <input 
                            type="number"
                            id="discountPercentage"
                            step="1"
                            {...register("discountPercentage", { valueAsNumber: true })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.discountPercentage ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="0 a 100"
                        />
                        {errors.discountPercentage && (
                          <p className="mt-1 text-sm text-red-600">{errors.discountPercentage.message}</p>
                        )}
                    </div>

                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                            Calificación (0-5)
                        </label>
                        <input 
                            type="number"
                            id="rating"
                            step="0.1"
                            {...register("rating", { valueAsNumber: true })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.rating ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="Ej: 4.5"
                        />
                        {errors.rating && (
                          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                        )}
                    </div>

                    {/* Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                            Stock *
                        </label>
                        <input 
                            type="number"
                            id="stock"
                            step="1"
                            {...register("stock", { valueAsNumber: true })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.stock ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="Cantidad disponible"
                        />
                        {errors.stock && (
                          <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                            Marca *
                        </label>
                        <input 
                            type="text"
                            id="brand"
                            {...register("brand")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.brand ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="Nombre de la marca"
                        />
                        {errors.brand && (
                          <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
                        )}
                    </div>
                    
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Categoría *
                        </label>
                        <input 
                            type="text"
                            id="category"
                            {...register("category")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="Ej: Electrónica, Hogar"
                        />
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Thumbnail (URL) */}
                    <div>
                        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                            URL Miniatura *
                        </label>
                        <input 
                            type="text"
                            id="thumbnail"
                            {...register("thumbnail")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                        }`}
                            placeholder="https://ejemplo.com/miniatura.jpg"
                        />
                        {errors.thumbnail && (
                          <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>
                        )}
                    </div>

                    {/* Botón de Envío */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#5c493c] text-white font-semibold py-3 px-6 cursor-pointer rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 disabled:opacity-50"
                    >
                        {isPending ? 'Guardando...' : 'Crear Producto'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  ) 

}