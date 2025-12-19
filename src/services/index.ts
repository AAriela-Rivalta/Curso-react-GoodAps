import { api } from "../lib/api";

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
    images?: string[]; 
}

// Products
async function getAllProducts() {
  return await api.get("/products");
}

async function getDetailsProducts(id: number | undefined){
    return await api.get(`/products/${id}`)
}

async function deleteProducts(id: number | undefined) {
  return await api.delete(`/products/${id}`)
}

async function createProducts(body: Product): Promise<any> {
  return await api.post('/products/add', {
    title: body.title,
    description: body.description,
    price: body.price,
    discountPercentage: body.discountPercentage,
    rating: body.rating,
    stock: body.stock,
    brand: body.brand,
    category: body.category,
    thumbnail: body.thumbnail,
  });
}

async function updateProducts(id: number, body: Product): Promise<any> {
  return await api.put(`/products/${id}`, {
    title: body.title,
    description: body.description,
    price: body.price,
    discountPercentage: body.discountPercentage,
    rating: body.rating,
    stock: body.stock,
    brand: body.brand,
    category: body.category,
    thumbnail: body.thumbnail,
  })
}

async function getAllUsers () {
  return await api.get("/users")
}

export {
    getAllProducts,
    getDetailsProducts,
    deleteProducts,
    createProducts,
    updateProducts,
    getAllUsers,
}