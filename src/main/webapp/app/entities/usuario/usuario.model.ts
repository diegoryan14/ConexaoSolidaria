import { IUser } from 'app/entities/user/user.model';
import { TipoUser } from 'app/entities/enumerations/tipo-user.model';
import { Ativo } from 'app/entities/enumerations/ativo.model';

export interface IUsuario {
  id: number;
  nome?: string | null;
  cpf?: string | null;
  cnpj?: string | null;
  email?: string | null;
  tipoUser?: keyof typeof TipoUser | null;
  ativo?: keyof typeof Ativo | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewUsuario = Omit<IUsuario, 'id'> & { id: null };
