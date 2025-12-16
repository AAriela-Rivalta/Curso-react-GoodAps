import { useMutation } from '@tanstack/react-query';
import { updateProducts } from '../services';

interface Product {
    title: string; 
    description: string;
    price: number;
    discountPercentage: number; 
    rating: number; 
    stock: number;
    brand: string;
    category: string;
    thumbnail: string; 
}

type paramsType = {
    id: number;
    body: Product;
}

export function useUpdateProducts() {
    return useMutation({
        mutationKey: ['update-product'],
        mutationFn: ({ id, body }: paramsType) => 
            updateProducts(id, body),
    });
}