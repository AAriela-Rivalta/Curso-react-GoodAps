import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import { Layouts } from "./components/layouts/Layouts";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { ProductDetails } from "./pages/ProductDetails";
import { Form } from "./pages/Form";
import { Login } from "./pages/Login";


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
        element: <Login />
      },
      {
        path: '/products',
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
      {
        path: '/users',
        element: <Users />
      }
    ]
  },
])