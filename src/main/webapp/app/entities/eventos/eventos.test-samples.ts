import dayjs from 'dayjs/esm';

import { IEventos, NewEventos } from './eventos.model';

export const sampleWithRequiredData: IEventos = {
  id: 15371,
};

export const sampleWithPartialData: IEventos = {
  id: 25802,
  nome: 'panic what reasonable',
  horaTermino: 'properly provided within',
  observacao: 'colloquy daily woot',
};

export const sampleWithFullData: IEventos = {
  id: 16628,
  nome: 'meh coop as',
  data: dayjs('2024-09-08T18:02'),
  horaInicio: 'stomach disaster than',
  horaTermino: 'knight gee',
  observacao: 'sonar finally anxious',
};

export const sampleWithNewData: NewEventos = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
