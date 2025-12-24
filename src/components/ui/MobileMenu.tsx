import { Link } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLogged: boolean;
  handleLogout: () => void;
  username: string;
}

export function MobileMenu({ isOpen, onClose, isLogged, handleLogout, username }: Props) {
  return (
    <>
      {/* Fondo oscuro (Overlay) cuando el menú está abierto */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Contenedor del Menú */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#eee9e1] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-6 flex flex-col h-full">
          <button onClick={onClose} className="self-end text-2xl">✕</button>
          
          <div className="mt-8 mb-10">
            <p className="text-gray-600 italic">Hola,</p>
            <p className="text-xl font-bold">{username}</p>
          </div>

          <nav className="flex flex-col gap-6 text-lg">
            {!isLogged ? (
              <Link to="/" onClick={onClose} className="hover:text-[#cd6d22]">Login</Link>
            ) : (
              <>
                <Link to="/products" onClick={onClose} className="hover:text-[#cd6d22]">Home</Link>
                <Link to="/users" onClick={onClose} className="hover:text-[#cd6d22]">Users</Link>
                <Link to="/new-product" onClick={onClose} className="hover:text-[#cd6d22]">Nuevo Producto</Link>
                
                <button 
                  onClick={handleLogout}
                  className="mt-10 bg-[#cd6d22] text-white py-2 rounded-lg"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}