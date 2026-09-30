import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s9observaciones',
  templateUrl: './s9observaciones.component.html',
  styleUrls: ['./s9observaciones.component.scss']
})
export class S9observacionesComponent implements OnInit, OnDestroy {

  body = {
    motivoConsulta:'',
    diagnosticoMedico: '',
    mecanismoLesion: '',
    tratamientosPrevios: '',
    observaciones: '',
    tratamiento: ""
  }
  initBody = JSON.parse(JSON.stringify(this.body)); 
  isEditing = false;
  isSaving = false;
  hasUnsavedChanges = false;
  private originalBody = { ...this.body };
  idPx: number|null = null;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor( 
    private utilService: UtilService,
    private authService: AuthService,    
    private sharedDataService: SharedDataService
  ) {  }
  ngOnInit(): void {
    this.checkCurrentPxId();

    this.sharedDataService.idPacienteObservable.pipe(takeUntil(this.destroy$)).subscribe(id => {
          this.idPx = id;
          this.checkCurrentPxId();
        })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // console.log('Suscripción destruida ✅ S9');
  }
  checkCurrentPxId(): void {
    this.isLoading = true;
    let currentPxId = sessionStorage.getItem('currentPxId');
    if (!!currentPxId) {
      console.log('ID actual del paciente', currentPxId);
      const apiCall = this.authService.getById('fichaMedicaAux','id_paciente', currentPxId);
      this.sharedDataService.loadSectionData('s9', apiCall, this.initBody).subscribe(
        (response) => {
          console.log('S9 Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.initBody;
          this.validarAlturaAll();
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
          this.isLoading = false;
        }
      );
    }
  }

  guardar() {
    this.hasUnsavedChanges = true;
  }

  iniciarEdicion(): void {
    this.originalBody = { ...this.body };
    this.hasUnsavedChanges = false;
    this.isEditing = true;
  }

  cancelarEdicion(): void {
    this.body = { ...this.originalBody };
    this.isEditing = false;
    this.hasUnsavedChanges = false;
  }

  guardarCambios(): void {
    if (this.isSaving) return;
    this.isSaving = true;
    this.sharedDataService.saveSection('s9', { ...this.body }).subscribe(
      () => {
        this.originalBody = { ...this.body };
        this.isEditing = false;
        this.isSaving = false;
        this.hasUnsavedChanges = false;
      },
      error => {
        console.error('Error al guardar Observaciones:', error);
        this.isSaving = false;
      }
    );
  }
   // TEXT AREA AUTO AJUSTE
   adjustTextareaHeight(id: string): void {
    this.utilService.adjustTextAreaH(id);
  }
  resetTextareaHeight(id: string): void {
    this.utilService.resetTextareaH(id);
  }
  validarAlturaAll() {
    console.log("validarAlturaAll()");
    
    setTimeout( () => { 
      this.utilService.adjustTextAreaH('motivoConsulta');
      this.utilService.adjustTextAreaH('diagnosticoMedico');
      this.utilService.adjustTextAreaH('mecanismoLesion');
      this.utilService.adjustTextAreaH('tratamientosPrevios');
      this.utilService.adjustTextAreaH('observaciones');
      this.utilService.adjustTextAreaH('tratamiento');
    }, 500); 
  }
}
  

