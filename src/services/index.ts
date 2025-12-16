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
    //images: string[]; 
}

async function getAllProducts() {
    const res = await api.get("/products")

    return res.data
}

async function getDetailsProducts(id: number | undefined){
    const res = await api.get(`/products/${id}`)

    return res.data
}

async function deleteProducts(id: number | undefined) {
  const res = await api.delete(`/products/${id}`);

  return res.data;
}

async function createProducts(body: Product): Promise<any> {
  const res = await api.post('/products/add', {
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

  return res.data;
}

async function updateProducts(id: number, body: Product): Promise<any> {
  const res = await api.put(`/products/${id}`, {
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

  return res.data;
}

export {
    getAllProducts,
    getDetailsProducts,
    deleteProducts,
    createProducts,
    updateProducts,
}