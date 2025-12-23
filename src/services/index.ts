import { api } from "../lib/api";

interface Product {
    id: number,
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

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
 
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Products
async function getAllProducts(): Promise<ProductsResponse> {
  return api.get("/products");
}

async function getDetailsProducts(id: number): Promise<Product> {
  return api.get(`/products/${id}`);
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

async function getAllUsers(): Promise<UsersResponse> {
  return api.get("/users");
}

export {
    getAllProducts,
    getDetailsProducts,
    deleteProducts,
    createProducts,
    updateProducts,
    getAllUsers,
}