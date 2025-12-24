import { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'

import { UserContext } from '../../context/UserContext';
import { useUserStore } from '../../store/useUserStore';

import { isAuth } from '../../auth/isAuth';
import { logout } from '../../auth/logout';


export function Layouts() {
  const userWithContext = useContext(UserContext);
  const userWithZustand = useUserStore(state => state.user);

  const navigate = useNavigate(); //sirve para redirigir al login al hacer logout
  const isLogged = isAuth(); //isLogged queda •true si hay token •false si o hay

  function handleLogout() {
    logout(); //borra el token
    navigate("/", { replace: true }); //te envia al login •replace: true evita que el usuario vuelva atras
  }

  if (!userWithContext) return null;



    
  
  return (
    <>
      <Toaster position="top-right" richColors />
      <header className='p-10 bg-[#eee9e1]'>
        <div className='flex justify-between'>
          <div>
            <Link to="/" className='text-3xl text-[#5c493c] font-bold italic'>DummyJSON</Link>
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
              {!isLogged && ( //si no hay token -> solo se muestra el login
                <li>
                  <Link to="/" className='hover:underline'>Login</Link>
                </li>
              )}

              {isLogged && ( //si hay token se renderiza esto
                <>
              <li>
                <Link to="/products" className='hover:underline'>Home</Link>
              </li>
              <li>
                <Link to="/users" className='hover:underline'>Users</Link>
              </li>
              <li>
                <Link to="/new-product" className='hover:underline'>Nuevo Producto</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="bg-[#cd6d22] px-3 py-1 rounded-lg hover:bg-[#a75719]">
                  Cerrar Sesión 
                </button>
              </li>
              </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className='p-20 bg-[#eee9e1]'></footer>
    </>
  )
}