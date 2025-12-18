import { Cover } from "../components/ui/Cover";
import { useAllUsers } from "../hooks/useAllUsers";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export function Users () {
    const { data, isPending } = useAllUsers();
    
    if (isPending) {
        return (
                <section className='h-[70vh] flex justify-center items-center'>
                    <Cover title='Cargando...' />
                </section>
        )
    }

    return (
    <section className="flex flex-col justify-center items-center p-10 ">
      <Cover title="Listado de Usuarios" />
      <div className="flex flex-wrap justify-center gap-6 mt-20 w-full max-w-6xl ">
         {data?.users?.map((user: any) => (
          <div
            key={user.id}
            className="w-80 border rounded-2xl p-5 bg-[#eee9e1] flex flex-col gap-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Imagen del usuario */}
            <div className="flex justify-center mb-2">
                <img 
                    src={user.image} 
                    alt={`Foto de ${user.firstName}`} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
                />
            </div>
            
            {/* Nombre y Username */}
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {/* Corregido: user.firstName y user.lastName */}
              {user.firstName} {user.lastName} 
            </h2>
            <p className="text-sm text-gray-500 text-center border-b pb-3">
              @{user.username}
            </p>
            
            {/* Contacto */}
            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.phone}</p>
            </div>
            
            {/* Dirección */}
            <div className="mt-3 text-sm text-gray-700">
              <p className="font-semibold">Dirección</p>
              {/* Corregido: Acceso a user.address.address y city */}
              <p>{user.address.address}</p>
              <p>{user.address.city}, {user.address.postalCode}</p>
            </div>
            
            {/* Geolocalización */}
            <div className="mt-3 text-xs text-gray-400">
              {/* Corregido: Acceso a user.address.coordinates.lat/lng */}
              Lat: {user.address.coordinates.lat.toFixed(5)} — Long: {user.address.coordinates.lng.toFixed(5)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

}