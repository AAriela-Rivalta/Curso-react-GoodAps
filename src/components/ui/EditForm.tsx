import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useUpdateProducts } from "../../hooks/useUpdateProducts";

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

export type ProductFormData = z.infer<typeof productSchema>;

interface EditFormProps {
    id: number;
    initialData: ProductFormData;
    onClose: () => void;
}

export function EditForm({ id, initialData, onClose }: EditFormProps) {
    const { mutate, isPending } = useUpdateProducts();

    const { 
        register, //funcion para conectar los inputs con el formulario
        handleSubmit, //funcion que procesa el envio y valida los datos
        formState: { errors }, //objeto que contiene los errores de validacion (si los hay)
        reset, //funcion para limpiar o recargar los valores del formulario
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema), //usa Zod para validar que los datos sean correctos
        defaultValues: initialData, //carga los datos iniciales del producto, se crea en el renderizado del Home (initialData)
    });

    useEffect(() => { //obliga al formulario a recargar los datos iniciales cuando cambian
        reset(initialData);
    }, [initialData, reset]);

    function onSubmit(body: ProductFormData) {
    mutate(
      { id, body }, //Le envia al hook el ID del producto y los nuevos datos (body)
      {
        onSuccess: () => { //si el servidor responde que todo salio bien:
          toast.success('Producto actualizado') //muestra un mensaje de exito
          onClose(); // cerrar modal automaticamente
        },
        onError: (error: any) => { //si hubo un error al actualizar:
          const message =
            error?.response?.data?.message ||
            error?.message ||
            'Ocurrió un error al actualizar el producto';

          toast.error(message) //muestra un mensaje de error
        },
      }
    );
  }

   return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 z-20 p-4">
            
            {/* Campo: Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Título *</label>
                <input 
                    id="title"
                    type="text"
                    {...register("title")}
                    className={`w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Campo: Description (Textarea) */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción *</label>
                <textarea 
                    id="description"
                    rows={3}
                    {...register("description")}
                    className={`w-full border px-3 py-2 rounded focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                ></textarea>
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Campos en cuadrícula (Price, Discount, Rating, Stock) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Campo: Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-1">Precio *</label>
                    <input 
                        id="price"
                        type="number"
                        step="any" // Permite decimales
                        {...register("price", { valueAsNumber: true })}
                        className={`w-full border px-3 py-2 rounded ${
                            errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Campo: DiscountPercentage */}
                <div>
                    <label htmlFor="discountPercentage" className="block text-sm font-medium mb-1">% Descuento *</label>
                    <input 
                        id="discountPercentage"
                        type="number"
                        step="0.01" // Permite decimales
                        {...register("discountPercentage", { valueAsNumber: true })}
                        className={`w-full border px-3 py-2 rounded ${
                            errors.discountPercentage ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.discountPercentage && <p className="text-red-600 text-sm mt-1">{errors.discountPercentage.message}</p>}
                </div>
                
                {/* Campo: Rating */}
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium mb-1">Calificación *</label>
                    <input 
                        id="rating"
                        type="number"
                        step="0.01" // Permite decimales para la calificación
                        {...register("rating", { valueAsNumber: true })}
                        className={`w-full border px-3 py-2 rounded ${
                            errors.rating ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating.message}</p>}
                </div>

                {/* Campo: Stock */}
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium mb-1">Stock *</label>
                    <input 
                        id="stock"
                        type="number"
                        {...register("stock", { valueAsNumber: true })}
                        className={`w-full border px-3 py-2 rounded ${
                            errors.stock ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
                </div>
            </div> {/* Fin de la cuadrícula */}
            
            {/* Campos en cuadrícula (Brand, Category) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Campo: Brand */}
                <div>
                    <label htmlFor="brand" className="block text-sm font-medium mb-1">Marca *</label>
                    <input 
                        id="brand"
                        type="text"
                        {...register("brand")}
                        className={`w-full border px-3 py-2 rounded ${
                            errors.brand ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.brand && <p className="text-red-600 text-sm mt-1">{errors.brand.message}</p>}
                </div>

                {/* Campo: Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">Categoría *</label>
                    <input 
                        id="category"
                        type="text"
                        {...register("category")}
                        className={`w-full border px-3 py-2 rounded ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
                </div>
            </div>
            
            {/* Campo: Thumbnail (URL) */}
            <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">URL de Miniatura *</label>
                <input 
                    id="thumbnail"
                    type="text"
                    {...register("thumbnail")}
                    className={`w-full border px-3 py-2 rounded ${
                        errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.thumbnail && <p className="text-red-600 text-sm mt-1">{errors.thumbnail.message}</p>}
            </div>

            {/* Botón de envío */}
            <div className="pt-4 flex justify-end gap-3">
               <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600 transition "
                >
                {isPending ? 'Editando...' : 'Guardar cambios'}
                </button>
            </div>
        </form>
    );

}
