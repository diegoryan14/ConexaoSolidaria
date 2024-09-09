import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IEventos } from 'app/entities/eventos/eventos.model';

export interface IAvaliacao {
  id: number;
  estrelas?: number | null;
  observacao?: string | null;
  usuario?: IUsuario | null;
  evento?: IEventos | null;
}

export type NewAvaliacao = Omit<IAvaliacao, 'id'> & { id: null };
