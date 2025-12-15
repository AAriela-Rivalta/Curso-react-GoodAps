import { Link, Outlet } from 'react-router-dom'
import  headerBg  from '../img/headerBg.jpg'


export function Layouts() {
    const imageUrl = headerBg;
  return (
    <>
      <header className='p-10 bg-center bg-no-repeat bg-cover h-40'
            style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className='flex justify-between'>
          <Link to="/" className='text-3xl font-bold'>Ecommerce</Link>
          <nav className=''>
            <ul className='flex items-center gap-2'>
              <li>
                <Link to="/" className='hover:underline'>Home</Link>
              </li>
              <li>
                <Link to="/new-product" className='hover:underline'>Nuevo Producto</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className='p-20 bg-gray-500'></footer>
    </>
  )
}