export type ResGenerico = {
  return: boolean;
  UUID: string;
  data: logueo[];
  respuesta: DatosTareas[];
};

export interface ResGeneric<T>{
  return: boolean
  errror: string
  respuesta: T[];
}

type logueo = {
  user: string;
  uuid: string;
};

export type DatosTareas = {
  titulo: string;
  descripcion: string;
  estado?: number;
  creacion?: string;
  prioridad: string;
  usuario?: number;
  vencimiento?: string;
};

export type LoginProps = {
  user: string;
  password: string;
};

export type DatosUsuarioStore = {
  UUID: string;
  addUser: (uuid: string) => void;
};
