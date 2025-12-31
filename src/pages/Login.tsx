import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginUser } from "../services"; // Importamos el servicio real
import { useUserStore } from "../store/useUserStore"; // Importamos Zustand

// 1. ESQUEMA DE VALIDACIÓN: DummyJSON usa 'username', no email.
const loginSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [loading, setLoading] = useState(false);
  
  // Traemos la acción de Zustand para guardar al usuario real
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setLoading(true);

    try {
      // 2. PETICIÓN REAL: Enviamos credenciales al servidor
      const response = await loginUser({
        username: data.username,
        password: data.password,
      });

      // 3. RESPUESTA EXITOSA: DummyJSON devuelve un accessToken y datos del usuario
      if (response.accessToken) {
        // Guardamos el token para que los interceptores lo usen
        localStorage.setItem("token", response.accessToken);

        // Actualizamos Zustand con la data real que viene del backend
        setUser({
          id: response.id,
          username: response.username,
        });

        toast.success(`¡Bienvenido de nuevo, ${response.firstName}!`);
        
        // Redirección forzada para limpiar estados previos y cargar con el nuevo token
        window.location.href = "/products";
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      
      // Manejo de errores amigable para el usuario
      const errorMessage = error.response?.data?.message || "Usuario o contraseña incorrectos";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-8 rounded-2xl border shadow-xl"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Bienvenido</h2>
          <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Input de Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <input
            type="text"
            placeholder="Ej: emilys"
            {...register("username")}
            className={`w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 transition-all
              ${errors.username
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-orange-200"
              }`}
          />
          {errors.username && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Input de Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={`w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 transition-all
              ${errors.password
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-orange-200"
              }`}
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Botón de Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#cd6d22] text-white font-bold py-3 rounded-xl hover:bg-[#a75719] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verificando...
            </span>
          ) : (
            "Iniciar Sesión"
          )}
        </button>

        {/* Tip para la presentación */}
        <div className="mt-6 p-3 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-[10px] text-orange-800 text-center uppercase tracking-widest font-bold">
            Credenciales de prueba
          </p>
          <p className="text-xs text-orange-700 text-center mt-1">
            User: <span className="font-mono font-bold">emilys</span> | Pass: <span className="font-mono font-bold">emilyspass</span>
          </p>
        </div>
      </form>
    </div>
  );
}