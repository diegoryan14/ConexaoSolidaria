import { IUsuario, NewUsuario } from './usuario.model';

export const sampleWithRequiredData: IUsuario = {
  id: 19725,
};

export const sampleWithPartialData: IUsuario = {
  id: 12248,
  cpf: 'boo weakly',
  email: 'Carla.Reis@yahoo.com',
  tipoUser: 'ENTIDADE',
};

export const sampleWithFullData: IUsuario = {
  id: 3301,
  nome: 'furiously',
  cpf: 'finally alienated thankfully',
  cnpj: 'multicolored',
  email: 'MariaLuiza_Santos@live.com',
  tipoUser: 'ENTIDADE',
  ativo: 'S',
};

export const sampleWithNewData: NewUsuario = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
