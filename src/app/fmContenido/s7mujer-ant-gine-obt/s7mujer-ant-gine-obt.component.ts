import { Component, OnInit, OnDestroy} from '@angular/core';
import { GinecoObs } from 'src/app/models/gineco-obs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s7mujer-ant-gine-obt',
  templateUrl: './s7mujer-ant-gine-obt.component.html',
  styleUrls: ['./s7mujer-ant-gine-obt.component.scss']
})
export class S7mujerAntGineObtComponent implements OnInit, OnDestroy {
  
  formData: any = {
    mecarcaSiNo:false,
    dismenorreasSiNo:false,
    gestaActualSiNo:false,
    numeroGestasSiNo:false,
    numeroPartosSiNo:false,
    cesareasSiNo:false,
    abortosSiNo:false,
    nacidosVivosSiNo:false,
    menopausiaSiNo:false,
  };
  showTable = true;
  body: GinecoObs = {
      mecarca_e:'',
      dismenorreas_e:'',
      gestaActual_e:'',
      numeroGestas_e:'',
      numeroPartos_e:'',
      cesareas_e:'',
      abortos_e:'',
      nacidosVivos_e:'',
      menopausia_e:'',
      updated: ''
      
  }
    showSuccessModal = false;

  initBody = JSON.parse(JSON.stringify(this.body)); 
  isEditing = false;
  isSaving = false;
  hasUnsavedChanges = false;
  private originalState: any;
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
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // console.log('Suscripción destruida ✅ S7');
  }
  checkCurrentPxId(): void {
    this.isLoading = true; 
    let currentPxId = sessionStorage.getItem('currentPxId');
    
    if (!!currentPxId) {
      console.log('ID actual del paciente', currentPxId);
      const apiCall = this.authService.getById('mujerFm', 'id_paciente', currentPxId);
      this.sharedDataService.loadSectionData('s7', apiCall, this.initBody).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.initBody;
          this.updateFormData();
          this.validarAlturaAll();
          this.isLoading = false; 
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
          this.isLoading = false; 
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
      this.isLoading = false;
    }
  }
  
  updateFormData() {
    this.formData.mecarcaSiNo = Boolean( this.body.mecarca_e);
    this.formData.dismenorreasSiNo = Boolean( this.body.dismenorreas_e);
    this.formData.gestaActualSiNo = Boolean( this.body.gestaActual_e);
    this.formData.numeroGestasSiNo = Boolean( this.body.numeroGestas_e);
    this.formData.numeroPartosSiNo = Boolean( this.body.numeroPartos_e);
    this.formData.cesareasSiNo = Boolean( this.body.cesareas_e);
    this.formData.abortosSiNo = Boolean( this.body.abortos_e);
    this.formData.nacidosVivosSiNo = Boolean( this.body.nacidosVivos_e);
    this.formData.menopausiaSiNo = Boolean( this.body.menopausia_e);
  }
  guardar() {
    this.hasUnsavedChanges = true;
  }

  iniciarEdicion(): void {
    this.originalState = JSON.parse(JSON.stringify({ body: this.body, formData: this.formData, showTable: this.showTable }));
    this.hasUnsavedChanges = false;
    this.isEditing = true;
  }

  cancelarEdicion(): void {
    this.body = this.originalState.body;
    this.formData = this.originalState.formData;
    this.showTable = this.originalState.showTable;
    this.isEditing = false;
    this.hasUnsavedChanges = false;
  }

guardarCambios(): void {
  if (this.isLoading) return;
  
  this.isLoading = true;         
  this.showSuccessModal = false;  

  this.sharedDataService.saveSection('s7', { ...this.body }).subscribe(
    () => {
      this.isEditing = false;
      this.isLoading = false;     
      this.hasUnsavedChanges = false;
      this.body.updated = new Date().toISOString();

      this.showSuccessModal = true; 
    },
    error => {
      console.error('Error al guardar PX Deportivo:', error);
      this.isLoading = false;     
    }
  );
}

cerrarModalExito(): void {
  this.showSuccessModal = false;
}

  limpiar($event: any,id: keyof GinecoObs) {
   if (!$event) {
    this.body[id] = ''
    this.resetTextareaHeight(id);
   } else {
     window.setTimeout(function () { 
      document.getElementById(id)?.focus();
    }, 0); 
   }
    this.guardar();
  }
  // TEXT AREA AUTO AJUSTE
  adjustTextareaHeight(id: string): void {
    this.utilService.adjustTextAreaH(id);
  }
  resetTextareaHeight(id: string): void {
    this.utilService.resetTextareaH(id);
  }
  validarAlturaAll() {
    setTimeout( () => { 
      this.utilService.adjustTextAreaH('mecarca_e');
      this.utilService.adjustTextAreaH('dismenorreas_e');
      this.utilService.adjustTextAreaH('gestaActual_e');
      this.utilService.adjustTextAreaH('numeroGestas_e');
      this.utilService.adjustTextAreaH('numeroPartos_e');
      this.utilService.adjustTextAreaH('cesareas_e');
      this.utilService.adjustTextAreaH('abortos_e');
      this.utilService.adjustTextAreaH('nacidosVivos_e');
      this.utilService.adjustTextAreaH('menopausia_e');
    }, 0); 
  }
  

}
