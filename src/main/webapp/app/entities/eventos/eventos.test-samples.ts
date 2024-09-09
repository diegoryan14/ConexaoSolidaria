import dayjs from 'dayjs/esm';

import { IEventos, NewEventos } from './eventos.model';

export const sampleWithRequiredData: IEventos = {
  id: 11418,
};

export const sampleWithPartialData: IEventos = {
  id: 16596,
  dataEvento: dayjs('2024-09-09T01:42'),
  horaInicio: 'cut',
};

export const sampleWithFullData: IEventos = {
  id: 11754,
  nome: 'sans',
  dataCadastro: dayjs('2024-09-08T13:58'),
  dataEvento: dayjs('2024-09-08T20:06'),
  horaInicio: 'properly provided within',
  horaTermino: 'colloquy daily woot',
  observacao: 'supposing tablecloth',
};

export const sampleWithNewData: NewEventos = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
