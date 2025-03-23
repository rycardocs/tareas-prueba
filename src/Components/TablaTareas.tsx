import { useState } from "react";
import UseFetch from "../api/useFetch";
import { useLoginStore } from "../Store/LoginStore";
import { DatosTareas, ResGeneric } from "../Types/types";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

const TablaTareas = ({
  tareas,
  actualizar,
  traer
}: {
  tareas: DatosTareas[];
  actualizar: (e: DatosTareas[]) => void;
  traer: () => void;
}) => {
  const { UUID } = useLoginStore();
  const initialValues: DatosTareas = { 
      idTarea: 0,
      titulo:  "",
      descripcion: "",
      fecha:  "",
      prioridad: "0",
      estado: 0
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<DatosTareas>({ defaultValues: initialValues });
  const [openDrop, setOpenDrop] = useState(false);
  const [drop,setDrop] = useState(false)
  const [idTarea, setIdTarea] = useState<number>()
  let fecha;
  const filtrar = async (opcion: React.ChangeEvent<HTMLSelectElement>) => {
    const opc = opcion.target.value;
    console.log({ req: "filtrar", uuid: UUID, opcion: opc });
    try {
      const res = await UseFetch<ResGeneric<DatosTareas>>(
        { req: "filtrar", uuid: UUID, prioridad: opc },
        "http://127.0.0.1:5000/tareas"
      );
      console.log(res);
      if (res.return) {
        actualizar(res.respuesta);
      }
    } catch (error) {
      console.log(error);
      
    } finally {
      setDrop(false)
    }
  };

  const editar = async (formdata: DatosTareas) => {
    console.log(formdata)
    try {
      const res = await UseFetch<ResGeneric<DatosTareas>>({req: 'editar',...formdata}, "http://127.0.0.1:5000/tareas")
      console.log(res)
      if(res.return){
        traer()
      }
    } catch (error){
      console.log(error)
    } finally{
      setDrop(false)
      setOpenDrop(false)
      reset(initialValues)
      traer()
    }
  }

  const eliminar = async () => {
    try {
      const res = await UseFetch<ResGeneric<DatosTareas>>(
        { req: 'eliminar',uuid: UUID, idTarea: idTarea},
        "http://127.0.0.1:5000/tareas"
      );
      console.log(res);
      if (res.return) {
        actualizar(res.respuesta);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDrop(false)
      traer()
    }
  };

  const buscar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const opcion = e.target.value
    try {
      const res = await UseFetch<ResGeneric<DatosTareas>>(
        { req: "buscar", uuid: UUID, titulo: opcion},
        "http://127.0.0.1:5000/tareas"
      );
      console.log(res);
      if (res.return) {
        actualizar(res.respuesta);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <section className="bg-slate-100 rounded-md space-y-1">
        <div className="flex flex-col lg:flex-row justify-end gap-1">
          <input
            type="text"
            className="bg-white w-1/2 md:w-full h-10 rounded-md"
            placeholder="Buscar..."
            onChange={buscar}
          />
          <select
            name="filter"
            id="filter"
            className="bg-white md:w-full w-1/2 h-10 rounded-md"
            onChange={filtrar}
          >
            <option value={10}>Todas</option>
            <option value={9}>Pendiente</option>
            <option value={8}>Finalizado</option>
            <option value={2}>Prioridad Alta</option>
            <option value={1}>Prioridad Media</option>
            <option value={0}>Prioridad Baja</option>
          </select>
        </div>

        <div className="bg-slate-700 text-white font-semibold text-xs sm:text-base md:text-lg xl:text-xl text-center items-center uppercase p-2 grid grid-cols-6 rounded-md">
          <p>Titulo</p>
          <p>Descripcion</p>
          <p>Fecha de creacion</p>
          <p>Fecha de vencimiento</p>
          <p>Estado</p>
          <p>Prioriodad</p>
        </div>
        {tareas?.map((tarea, i) => (
          <div
            key={i}
            className="grid grid-cols-6 text-center bg-white my-1 rounded-md items-center cursor-pointer"
            onClick={() => {setOpenDrop(!openDrop); setIdTarea(tarea.idTarea); reset(tarea);}}
          >
            <h3 className="font-bold">{tarea.titulo}</h3>
            <p className="text-balance overflow-hidden">{tarea.descripcion}</p>
            <p>{tarea.creacion?.slice(0, 17)}</p>
            <p>{tarea.vencimiento?.slice(0, 17)}</p>
            <p>{tarea.estado == 9 ? "Pendiente" : "Finalizado"}</p>
            <p>
              {tarea.prioridad == "0"
                ? "Baja"
                : tarea.prioridad == "1"
                ? "Media"
                : "Alta"}
            </p>
          </div>
        ))}
      </section>
      <Modal cState={setOpenDrop} state={openDrop}>
        <div className="bg-white w-md h-52 flex justify-center flex-col text-white rounded-lg font-bold items-center gap-6">
          <button className="bg-sky-600 w-fit px-4 py-2 rounded-lg hover:bg-sky-900" onClick={() => setDrop(!drop)}>Editar</button>
          <button className="bg-red-500 w-fit px-4 py-2 rounded-lg hover:bg-red-700" onClick={eliminar}>Borrar</button>
        </div>
      </Modal>
      <Modal cState={setDrop} state={drop}>
      <form
        onSubmit={handleSubmit(editar)}
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
            defaultValue={new Date().toISOString().split('T')[0]}
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
        <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="prioridad" className="text-2xl">
            Estado
            </label>
            <select
            id="prioridad"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("estado", {
              required: "La prioridad es obligatoria",
            })}
            >
            <option value="">Selecciona</option>
            <option value="8">Finalizado</option>
            <option value="9">Pendiente</option>
            </select>
          {errors.prioridad && (
            <p className="text-red-500">{errors.estado?.message}</p>
          )}
        </div>
        
        <input
          type="submit"
          className="bg-gray-400 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
          value="Subir Tarea"
        />
      </form>
      </Modal>
    </>
  );
};

export default TablaTareas;
