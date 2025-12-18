import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

import { UserContext } from '../../context/UserContext';
import { useUserStore } from '../../store/useUserStore';


export function Layouts() {
  const userWithContext = useContext(UserContext);
  const userWithZustand = useUserStore(state => state.user);

   if (!userWithContext) return null;



    
  
   return (
    <>
      <Toaster position="top-right" richColors />
      <header className='p-10 bg-[#eee9e1]'>
        <div className='flex justify-between'>
          <div>
            <Link to="/" className='text-3xl text-[#5c493c] font-bold'>Ecommerce GoodApps</Link>
            <div className='flex flex-col mt-1'>
              <span>
                Hola <span className='font-bold'>{userWithContext.username}</span>{' '}
                desde CreateContext{' '}
              </span>
              <span>
                Hola <span className='font-bold'>{userWithZustand.username}</span>{' '}
                desde Zustand
              </span>
            </div>
          </div>
          <nav className=''>
            <ul className='flex items-center gap-2'>
              <li>
                <Link to="/" className='hover:underline'>Home</Link>
              </li>
              <li>
                <Link to="/users" className='hover:underline'>Users</Link>
              </li>
              <li>
                <Link to="/new-product" className='hover:underline'>Nuevo Producto</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className='p-20 bg-[#eee9e1]'></footer>
    </>
  )
}