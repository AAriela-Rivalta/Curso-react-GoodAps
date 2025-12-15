import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import { Layouts } from "./components/layouts/Layouts";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Form } from "./pages/Form";


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <Layouts />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'products/:id',
        element: <ProductDetails />
    },
    {
        path: '/new-product',
        element: <Form />
      },
    ]
  },
])