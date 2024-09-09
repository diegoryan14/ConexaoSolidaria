import dayjs from 'dayjs/esm';

import { IEventos, NewEventos } from './eventos.model';

export const sampleWithRequiredData: IEventos = {
  id: 15371,
};

export const sampleWithPartialData: IEventos = {
  id: 25802,
  nome: 'panic what reasonable',
  horaTermino: '31824',
  observacao: 'qua depressurize with',
};

export const sampleWithFullData: IEventos = {
  id: 7473,
  nome: 'that',
  data: dayjs('2024-09-08T18:08'),
  horaInicio: '22702',
  horaTermino: '27806',
  observacao: 'insistent auction',
};

export const sampleWithNewData: NewEventos = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
