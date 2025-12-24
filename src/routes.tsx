import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import { Layouts } from "./components/layouts/Layouts";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { ProductDetails } from "./pages/ProductDetails";
import { Form } from "./pages/Form";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";


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
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: 'products/:id',
        element: (
        <ProtectedRoute>
          <ProductDetails />
        </ProtectedRoute>
        )
      },
      {
        path: '/new-product',
        element: (
        <ProtectedRoute>
          <Form />
        </ProtectedRoute>)
      },
      {
        path: '/users',
        element: (
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>)
      }
    ]
  },
])