import dayjs from 'dayjs/esm';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IEventos } from 'app/entities/eventos/eventos.model';

export interface IInscricao {
  id: number;
  data?: dayjs.Dayjs | null;
  usuario?: IUsuario | null;
  evento?: IEventos | null;
}

export type NewInscricao = Omit<IInscricao, 'id'> & { id: null };
