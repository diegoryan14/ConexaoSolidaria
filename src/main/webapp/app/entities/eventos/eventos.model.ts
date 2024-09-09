import dayjs from 'dayjs/esm';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IEventos {
  id: number;
  nome?: string | null;
  dataCadastro?: dayjs.Dayjs | null;
  dataEvento?: dayjs.Dayjs | null;
  horaInicio?: string | null;
  horaTermino?: string | null;
  observacao?: string | null;
  usuario?: IUsuario | null;
}

export type NewEventos = Omit<IEventos, 'id'> & { id: null };
