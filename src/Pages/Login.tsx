import { useForm } from "react-hook-form";
import { LoginProps, ResGenerico } from "../Types/types";
import UseFetch from "../api/useFetch";
import { useLoginStore } from "../Store/LoginStore";
import { useEffect } from "react";

const Login = () => {
  const { UUID, addUser } = useLoginStore();
  const initialValues = {
    user: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginProps) => {
    console.log({req: 'login',...formData})
    try {
      const res = await UseFetch<ResGenerico>(
        {req: 'login',...formData},
        "http://127.0.0.1:5000"
      );
      if (res.return) {
        console.log(res.data);
        addUser(res.data[0].uuid)
      } else {
        console.log('Error')
      }
    } catch {
      console.log("Error");
    }
  };

  const verificar = async () => {
    try{
 
      const res = await UseFetch<ResGenerico>({req: 'reanudar', UUID:UUID}, "http://127.0.0.1:5000");
      if(res){
        location.href = '/Inicio'
      } else {
        localStorage.clear()
      }
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(() => {
    UUID && verificar()
  }, [UUID])

  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-3xl font-bold">Iniciar Sesion</h1>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white p-5 rounded-lg space-y-5 mt-10 w-full max-w-md"
          noValidate
        >
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="email" className="text-2xl">
              Correo Electronico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Correo Electronico"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("user", {
                required: "Ingresa tu correo",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.user && (
              <p className="text-red-500">{errors.user.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="password" className="text-2xl">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <input
            type="submit"
            className="bg-gray-400 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
            value="Iniciar Sesión"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
