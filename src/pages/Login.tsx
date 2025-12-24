import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z
      .string()
      .min(1, "La contraseña es obligatoria"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [loading, setLoading] = useState(false);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fakeResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
      };

      localStorage.setItem("token", fakeResponse.token);

      console.log("Token guardado:", fakeResponse.token);
      alert("Login exitoso");
      window.location.href = "/products";
    } catch (error) {
      console.error(error);
      alert("Error en el login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-xl border shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Iniciar Sesión 
        </h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2
              ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2
              ${errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#cd6d22] text-white py-2 rounded-lg hover:bg-[#a75719] transition disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Login"}
        </button>
      </form>
    </div>
  );
}