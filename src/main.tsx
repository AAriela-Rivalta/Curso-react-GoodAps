import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

import './index.css'
import { router } from './routes'
import { UserContext } from './context/UserContext';

const user = {
  id: 1,
  username: 'johnd',
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
      <RouterProvider router={router} />
      </UserContext.Provider>
    </QueryClientProvider>
  </StrictMode>,
)
