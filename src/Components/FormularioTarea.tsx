import { useForm } from "react-hook-form";
import { DatosTareas, ResGeneric } from "../Types/types";
import UseFetch from "../api/useFetch";
import { useLoginStore } from "../Store/LoginStore";

type Props = {
  enviarEstado: (estado: DatosTareas[])=> void
}

const FormularioTarea = ({enviarEstado}: Props) => {
  const {UUID} = useLoginStore()
  const initialValues = {
    titulo: "",
    descripcion: '',
    fecha: "",
    prioridad: '',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const handleTarea = async (formdata: DatosTareas) => {
    console.log({req: 'subirTarea',...formdata, uuid: UUID})
    try {
      const res = await UseFetch<ResGeneric<DatosTareas>>({req: 'traerTareas',...formdata,uuid: UUID}, "http://127.0.0.1:5000/tareas")
      console.log(res)
      if(res.return){
        enviarEstado(res.respuesta)
      }
    } catch (error){
      console.log(error)
    }
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit(handleTarea)}
        className="bg-white p-5 rounded-lg space-y-5 xl:min-w-sm xl:w-md"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="titulo" className="text-2xl">
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Titulo"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("titulo", {
              required: "Ingresa un titulo",
            })}
          />
          {errors.titulo && <p className="text-red-500">{errors.titulo.message}</p>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="descripcion" className="text-2xl">
            Descripcion
          </label>
          <input
            id="descripcion"
            type="text"
            placeholder="Descripcion"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("descripcion", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.descripcion && (
            <p className="text-red-500">{errors.descripcion.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="vence" className="text-2xl">
            Fecha de limite
          </label>
          <input
            id="fecha"
            type="date"
            placeholder="Fecha"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("fecha", {
              required: "Fecha limite es obligatoria",
            })}
          />
          {errors.descripcion && (
            <p className="text-red-500">{errors.descripcion.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="prioridad" className="text-2xl">
            Prioridad
            </label>
            <select
            id="prioridad"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("prioridad", {
              required: "La prioridad es obligatoria",
            })}
            >
            <option value="">Selecciona una prioridad</option>
            <option value="2">Alta</option>
            <option value="1">Media</option>
            <option value="0">Baja</option>
            </select>
          {errors.prioridad && (
            <p className="text-red-500">{errors.prioridad.message}</p>
          )}
        </div>
        <input
          type="submit"
          className="bg-gray-400 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
          value="Subir Tarea"
        />
      </form>
    </section>
  );
};

export default FormularioTarea;
