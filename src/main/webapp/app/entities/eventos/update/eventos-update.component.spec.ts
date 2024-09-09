import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { EventosService } from '../service/eventos.service';
import { IEventos } from '../eventos.model';
import { EventosFormService } from './eventos-form.service';

import { EventosUpdateComponent } from './eventos-update.component';

describe('Eventos Management Update Component', () => {
  let comp: EventosUpdateComponent;
  let fixture: ComponentFixture<EventosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let eventosFormService: EventosFormService;
  let eventosService: EventosService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EventosUpdateComponent],
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
      .overrideTemplate(EventosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EventosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    eventosFormService = TestBed.inject(EventosFormService);
    eventosService = TestBed.inject(EventosService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const eventos: IEventos = { id: 456 };
      const usuario: IUsuario = { id: 12559 };
      eventos.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 31827 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ eventos });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining),
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const eventos: IEventos = { id: 456 };
      const usuario: IUsuario = { id: 923 };
      eventos.usuario = usuario;

      activatedRoute.data = of({ eventos });
      comp.ngOnInit();

      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.eventos).toEqual(eventos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEventos>>();
      const eventos = { id: 123 };
      jest.spyOn(eventosFormService, 'getEventos').mockReturnValue(eventos);
      jest.spyOn(eventosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eventos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: eventos }));
      saveSubject.complete();

      // THEN
      expect(eventosFormService.getEventos).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(eventosService.update).toHaveBeenCalledWith(expect.objectContaining(eventos));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEventos>>();
      const eventos = { id: 123 };
      jest.spyOn(eventosFormService, 'getEventos').mockReturnValue({ id: null });
      jest.spyOn(eventosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eventos: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: eventos }));
      saveSubject.complete();

      // THEN
      expect(eventosFormService.getEventos).toHaveBeenCalled();
      expect(eventosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEventos>>();
      const eventos = { id: 123 };
      jest.spyOn(eventosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eventos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(eventosService.update).toHaveBeenCalled();
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
  });
});
