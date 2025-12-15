import { useMutation } from "@tanstack/react-query";

import { createProducts } from "../services";

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

export function useCreateProducts() {
    return useMutation({
        mutationKey: ['create-product'],
        mutationFn: (body: Product) => createProducts(body),
    });
}