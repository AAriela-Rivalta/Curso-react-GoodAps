import { useState, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { UserContext } from '../../context/UserContext';
import { useUserStore } from '../../store/useUserStore';
import { isAuth } from '../../auth/isAuth';
import { logout } from '../../auth/logout';

// Importas tu nuevo componente (lo creamos abajo)
import { MobileMenu } from '../ui/MobileMenu'; 

import { TopTicker } from '../ui/TopTicker';

import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

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
      
      {/*Ticker arriba de todo */}
      <TopTicker />

      {/*MENÚ DESLIZABLE */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isLogged={isLogged}
        handleLogout={handleLogout}
      />

      <header className='p-6 bg-[#eee9e1] flex justify-between items-center'>
        <div>
            <Link to="/" className='text-3xl text-[#5c493c] font-bold italic'>DummyJSON</Link>
            <div className='flex flex-col mt-1'>
              {/*<span>
                Hola <span className='font-bold'>{userWithContext.username}</span>{' '}
                desde CreateContext{' '}
              </span>*/}
              <span>
                Hola <span className='font-bold uppercase'>{userWithZustand.username}</span>{' '}
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
      
      <footer className=' bg-[#eee9e1] '>
        <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Columna 1: Logo y Eslogan */}
                    <div className="space-y-6">
                        <Link to="/" className='text-3xl text-[#5c493c] font-bold italic'>DummyJSON</Link>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            API REST falsa gratuita para datos JSON de marcador de posición
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    

                    

                    {/* Columna 2: Redes Sociales */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 ">Visitanos en redes</h3>
                        <div className="flex gap-4 text-[#cd6d22]  ">
                            <a href="#" className="p-2 rounded-full hover:bg-[#cd6d22] transition-colors hover:text-white">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full hover:bg-[#cd6d22] transition-colors hover:text-white">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full hover:bg-[#cd6d22] transition-colors hover:text-white">
                                <FaInstagram size={18} />
                            </a>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Barra Inferior (Beige) */}
                <div className="bg-[#cd6d22]">
                    <div className="max-w-7xl mx-auto px-10 py-5 flex flex-col md:flex-row justify-between items-center text-[#333333]  gap-4">
                        <p>DummyJSON - 2025 © Derechos Reservados</p>
                        <div className="flex gap-10">
                            <Link to="/" className="hover:underline">Política de privacidad</Link>
                            <Link to="/" className="hover:underline">Términos de uso</Link>
                            <Link to="/" className="hover:underline">Cookies</Link>
                        </div>
                    </div>
                </div>
      </footer>
    </>
  )
}