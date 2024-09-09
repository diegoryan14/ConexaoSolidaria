import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IEventos } from 'app/entities/eventos/eventos.model';
import { EventosService } from 'app/entities/eventos/service/eventos.service';
import { InscricaoService } from '../service/inscricao.service';
import { IInscricao } from '../inscricao.model';
import { InscricaoFormService, InscricaoFormGroup } from './inscricao-form.service';

@Component({
  standalone: true,
  selector: 'app-inscricao-update',
  templateUrl: './inscricao-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class InscricaoUpdateComponent implements OnInit {
  isSaving = false;
  inscricao: IInscricao | null = null;

  usuariosSharedCollection: IUsuario[] = [];
  eventosSharedCollection: IEventos[] = [];

  protected inscricaoService = inject(InscricaoService);
  protected inscricaoFormService = inject(InscricaoFormService);
  protected usuarioService = inject(UsuarioService);
  protected eventosService = inject(EventosService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: InscricaoFormGroup = this.inscricaoFormService.createInscricaoFormGroup();

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  compareEventos = (o1: IEventos | null, o2: IEventos | null): boolean => this.eventosService.compareEventos(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscricao }) => {
      this.inscricao = inscricao;
      if (inscricao) {
        this.updateForm(inscricao);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscricao = this.inscricaoFormService.getInscricao(this.editForm);
    if (inscricao.id !== null) {
      this.subscribeToSaveResponse(this.inscricaoService.update(inscricao));
    } else {
      this.subscribeToSaveResponse(this.inscricaoService.create(inscricao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscricao>>): void {
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

  protected updateForm(inscricao: IInscricao): void {
    this.inscricao = inscricao;
    this.inscricaoFormService.resetForm(this.editForm, inscricao);

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      inscricao.usuario,
    );
    this.eventosSharedCollection = this.eventosService.addEventosToCollectionIfMissing<IEventos>(
      this.eventosSharedCollection,
      inscricao.evento,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.inscricao?.usuario)))
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.eventosService
      .query()
      .pipe(map((res: HttpResponse<IEventos[]>) => res.body ?? []))
      .pipe(map((eventos: IEventos[]) => this.eventosService.addEventosToCollectionIfMissing<IEventos>(eventos, this.inscricao?.evento)))
      .subscribe((eventos: IEventos[]) => (this.eventosSharedCollection = eventos));
  }
}
