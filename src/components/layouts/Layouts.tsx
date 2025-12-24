import { useState, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { UserContext } from '../../context/UserContext';
import { useUserStore } from '../../store/useUserStore';
import { isAuth } from '../../auth/isAuth';
import { logout } from '../../auth/logout';

// Importas tu nuevo componente (lo creamos abajo)
import { MobileMenu } from '../ui/MobileMenu'; 

export function Layouts() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú
  
  const userWithContext = useContext(UserContext);
  const userWithZustand = useUserStore(state => state.user);
  const navigate = useNavigate();
  const isLogged = isAuth();

  function handleLogout() {
    logout();
    setIsMenuOpen(false); // Cerramos el menú al salir
    navigate("/", { replace: true });
  }

  if (!userWithContext) return null;

  return (
    <>
      <Toaster position="top-right" richColors />
      
      {/* EL MENÚ DESLIZABLE */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isLogged={isLogged}
        handleLogout={handleLogout}
        username={userWithContext.username}
      />

      <header className='p-6 bg-[#eee9e1] flex justify-between items-center'>
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
        
        {/* BOTÓN PARA ABRIR EL MENÚ (Hamburguesa) */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-[#5c493c] p-2"
        >
          {/* Icono simple de hamburguesa */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      <main>
        <Outlet />
      </main>
      
      <footer className='p-20 bg-[#eee9e1]'></footer>
    </>
  )
}