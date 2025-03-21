import { DatosTareas } from "../Types/types";

const TablaTareas = ({ tareas }: { tareas: DatosTareas[] }) => {
  return (
    <section className="bg-slate-100 rounded-md">
      <div className="bg-slate-700 text-white font-semibold text-xs sm:text-base md:text-lg xl:text-xl text-center items-center uppercase p-2 grid grid-cols-6 rounded-md">
        <p>Titulo</p>
        <p>Descripcion</p>
        <p>Fecha de creacion</p>
        <p>Fecha de vencimiento</p>
        <p>Estado</p>
        <p>Prioriodad</p>
      </div>
      {tareas?.map((tarea, i) => (
        <div key={i} className="grid grid-cols-6 text-center items-center">
          <h3>{tarea.titulo}</h3>
          <p>{tarea.descripcion}</p>
          <p>{tarea.creacion?.slice(0, 17)}</p>
          <p>{tarea.vencimiento?.slice(0,17)}</p>
          <p>{tarea.estado == 0 ? 'Pendiente' : 'Finalizado'}</p>
          <p>{tarea.prioridad}</p>
        </div>
      ))}
    </section>
  );
};

export default TablaTareas;
