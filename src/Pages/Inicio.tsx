import { useEffect, useState } from "react";
import { useLoginStore } from "../Store/LoginStore";
import UseFetch from "../api/useFetch";
import NavBar from "../Components/NavBar";
import { DatosTareas, ResGenerico } from "../Types/types";
import TablaTareas from "../Components/TablaTareas";
import FormularioTarea from "../Components/FormularioTarea";

const Inicio = () => {
  const { UUID } = useLoginStore();
  const [tareas, setTareas] = useState<DatosTareas[]>([]);

  const actualizar = (estado: DatosTareas[]) => {
    setTareas(estado);
  };

  const traerTareas = async () => {
    try {
      const res = await UseFetch<ResGenerico>(
        { req: "traerTareas", uuid: UUID },
        "http://127.0.0.1:5000/tareas"
      );
      console.log(res);
      if (res.return) {
        setTareas(res.respuesta);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UUID && traerTareas();
  }, [UUID]);

  return (
    <>
      <NavBar />
      <main className="container mx-auto space-y-5 xl:flex gap-2">
        <FormularioTarea enviarEstado={actualizar} />
        <TablaTareas tareas={tareas} />
      </main>
    </>
  );
};

export default Inicio;
