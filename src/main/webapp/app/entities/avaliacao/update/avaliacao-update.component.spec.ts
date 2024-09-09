import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IEventos } from 'app/entities/eventos/eventos.model';
import { EventosService } from 'app/entities/eventos/service/eventos.service';
import { IAvaliacao } from '../avaliacao.model';
import { AvaliacaoService } from '../service/avaliacao.service';
import { AvaliacaoFormService } from './avaliacao-form.service';

import { AvaliacaoUpdateComponent } from './avaliacao-update.component';

describe('Avaliacao Management Update Component', () => {
  let comp: AvaliacaoUpdateComponent;
  let fixture: ComponentFixture<AvaliacaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let avaliacaoFormService: AvaliacaoFormService;
  let avaliacaoService: AvaliacaoService;
  let usuarioService: UsuarioService;
  let eventosService: EventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AvaliacaoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AvaliacaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    avaliacaoFormService = TestBed.inject(AvaliacaoFormService);
    avaliacaoService = TestBed.inject(AvaliacaoService);
    usuarioService = TestBed.inject(UsuarioService);
    eventosService = TestBed.inject(EventosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const avaliacao: IAvaliacao = { id: 456 };
      const usuario: IUsuario = { id: 593 };
      avaliacao.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 13035 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ avaliacao });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining),
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Eventos query and add missing value', () => {
      const avaliacao: IAvaliacao = { id: 456 };
      const evento: IEventos = { id: 17345 };
      avaliacao.evento = evento;

      const eventosCollection: IEventos[] = [{ id: 22024 }];
      jest.spyOn(eventosService, 'query').mockReturnValue(of(new HttpResponse({ body: eventosCollection })));
      const additionalEventos = [evento];
      const expectedCollection: IEventos[] = [...additionalEventos, ...eventosCollection];
      jest.spyOn(eventosService, 'addEventosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ avaliacao });
      comp.ngOnInit();

      expect(eventosService.query).toHaveBeenCalled();
      expect(eventosService.addEventosToCollectionIfMissing).toHaveBeenCalledWith(
        eventosCollection,
        ...additionalEventos.map(expect.objectContaining),
      );
      expect(comp.eventosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const avaliacao: IAvaliacao = { id: 456 };
      const usuario: IUsuario = { id: 19156 };
      avaliacao.usuario = usuario;
      const evento: IEventos = { id: 13976 };
      avaliacao.evento = evento;

      activatedRoute.data = of({ avaliacao });
      comp.ngOnInit();

      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.eventosSharedCollection).toContain(evento);
      expect(comp.avaliacao).toEqual(avaliacao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAvaliacao>>();
      const avaliacao = { id: 123 };
      jest.spyOn(avaliacaoFormService, 'getAvaliacao').mockReturnValue(avaliacao);
      jest.spyOn(avaliacaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ avaliacao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: avaliacao }));
      saveSubject.complete();

      // THEN
      expect(avaliacaoFormService.getAvaliacao).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(avaliacaoService.update).toHaveBeenCalledWith(expect.objectContaining(avaliacao));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAvaliacao>>();
      const avaliacao = { id: 123 };
      jest.spyOn(avaliacaoFormService, 'getAvaliacao').mockReturnValue({ id: null });
      jest.spyOn(avaliacaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ avaliacao: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: avaliacao }));
      saveSubject.complete();

      // THEN
      expect(avaliacaoFormService.getAvaliacao).toHaveBeenCalled();
      expect(avaliacaoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAvaliacao>>();
      const avaliacao = { id: 123 };
      jest.spyOn(avaliacaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ avaliacao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(avaliacaoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUsuario', () => {
      it('Should forward to usuarioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(usuarioService, 'compareUsuario');
        comp.compareUsuario(entity, entity2);
        expect(usuarioService.compareUsuario).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEventos', () => {
      it('Should forward to eventosService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(eventosService, 'compareEventos');
        comp.compareEventos(entity, entity2);
        expect(eventosService.compareEventos).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
