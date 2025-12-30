import { useParams } from "react-router-dom";

import { Cover } from "../components/ui/Cover";
import { useDetailsProducts } from "../hooks/useDetailsProducts";

export function ProductDetails() {
    const { id } = useParams();
    const { data, isPending} = useDetailsProducts(Number(id));

    if (isPending || !data) {
    return (
        <section className="h-[70vh] flex justify-center items-center">
            <Cover title="Cargando..." />
        </section>
    )
    }

   return (
        <>
            <section className='flex flex-col max-w-7xl m-auto p-10'>
                <div className='bg-[#cd6d22] p-1.5 rounded-xl w-max mb-2 text-sm text-white'>{data.category}</div>
                <Cover title={data.title} />

                <section className='flex gap-7 mt-14'>
                    {/* 🚨 Corrección: Usamos 'thumbnail' o 'images[0]' */}
                    <img 
                        src={data.thumbnail} 
                        alt={data.title} 
                        className='w-1/3 h-auto object-contain hover:shadow-2xl' // Añadí clases para control de tamaño
                    />

                    <div className='flex flex-col gap-3'>
                        {/* Mostramos precio con descuento si existe */}
                        <span className='text-4xl font-semibold'>
                            $ {data.price} 
                            {data.discountPercentage > 0 && 
                                <span className="text-lg text-green-600 ml-2"> (-{data.discountPercentage}%)</span>
                            }
                        </span>
                        <p className="italic">{data.description}</p>
                        <p className='text-sm text-gray-500'>Marca: {data.brand}</p>
                        <p className='text-sm text-gray-500'>Stock: {data.stock}</p>
                        <div className='flex items-center text-sm text-[#a75719] mt-2'>
                            <span role="img" aria-label="Rating Star" className='mr-1'>⭐ Rating:</span>
                            <span className='font-semibold text-[#a75719]'>{data.rating}</span>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )

}

