import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IEventos } from '../eventos.model';
import { EventosService } from '../service/eventos.service';
import { EventosFormService, EventosFormGroup } from './eventos-form.service';

@Component({
  standalone: true,
  selector: 'app-eventos-update',
  templateUrl: './eventos-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EventosUpdateComponent implements OnInit {
  isSaving = false;
  eventos: IEventos | null = null;

  usuariosSharedCollection: IUsuario[] = [];

  protected eventosService = inject(EventosService);
  protected eventosFormService = inject(EventosFormService);
  protected usuarioService = inject(UsuarioService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: EventosFormGroup = this.eventosFormService.createEventosFormGroup();

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eventos }) => {
      this.eventos = eventos;
      if (eventos) {
        this.updateForm(eventos);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eventos = this.eventosFormService.getEventos(this.editForm);
    if (eventos.id !== null) {
      this.subscribeToSaveResponse(this.eventosService.update(eventos));
    } else {
      this.subscribeToSaveResponse(this.eventosService.create(eventos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEventos>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(eventos: IEventos): void {
    this.eventos = eventos;
    this.eventosFormService.resetForm(this.editForm, eventos);

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      eventos.usuario,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.eventos?.usuario)))
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
