import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { estadoCivil } from 'src/app/catalogos/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s1datos-generales',
  templateUrl: './s1datos-generales.component.html',
  styleUrls: ['./s1datos-generales.component.scss']
})
export class S1datosGeneralesComponent implements OnInit, OnDestroy {
  body = {
    id_paciente: 0,
    escolaridad: "",
    ocupacion: "",
    religion: "",
    nacionalidad: "",
    contacto_de_emergencia: "",
    tel_contacto_de_emergencia: "",
    medico_tratante: "",
    lugar_de_residencia: "",
    remision: "",
    updated: "" // <-- 1. Agregado aquí para recibir la fecha del PHP
  };
  private originalBody = { ...this.body };
  isEditing = false;
  isSaving = false;
  hasUnsavedChanges = false;
  initBody = JSON.parse(JSON.stringify(this.body)); 
  infoPx = {
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    fecha_nacimiento: "",
    sexo: "",
    edo_civil: "",
    tipo_sangre: "",
    telefono: ""
  };
  showSuccessModal = false;

  showPhoneError: boolean = false;
  idPx: number | null = null;
  isLoading: boolean = false;
  catalogoEstadoCivil: { [key: string]: string } = estadoCivil;
  private destroy$ = new Subject<void>();

  constructor(
    private utilService: UtilService,
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.isLoading = true; 
    this.checkCurrentPxId();

    this.sharedDataService.idPacienteObservable.pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.idPx = id;
      this.checkCurrentPxId();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkCurrentPxId(): void {
    let currentPxId = sessionStorage.getItem('currentPxId');
    if (!!currentPxId) {
      const apiCall = this.authService.getById('datosGeneralesFm', 'id_paciente', currentPxId);
      this.sharedDataService.loadSectionData('s1', apiCall, this.initBody).subscribe(
        (response) => {
            this.body = response.length > 0 ? response[0] : this.initBody;
            this.llenarDatosGen(currentPxId);   
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
          this.isLoading = false; 
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }

  llenarDatosGen(currentPxId: string | null): void {
    if (currentPxId !== null) {
      this.authService.getById('pacientes', 'id', currentPxId)
        .subscribe(response => {
          if (response.length > 0) {
            this.infoPx = response[0]; 
            this.isLoading = false;
          } else {
            this.isLoading = false;
          }
        }, error => {
          console.error('Error al obtener los datos:', error);
          this.isLoading = false;
        });
    } 
  }

  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    return this.utilService.onlyNumbers(event);
  }

  iniciarEdicion(): void {
    this.originalBody = { ...this.body };
    this.isEditing = true;
  }

  cancelarEdicion(): void {
    this.body = { ...this.originalBody };
    this.showPhoneError = false;
    this.isEditing = false;
    this.hasUnsavedChanges = false;
  }

  marcarCambios(): void {
    this.hasUnsavedChanges = true;
  }

  guardar(): void {
  if (this.isLoading) {
    return;
  }
  this.isLoading = true;

  this.sharedDataService.saveSection('s1', { ...this.body }).subscribe(
    () => {
      this.originalBody = { ...this.body };
      this.isEditing = false;
      this.isLoading = false; 
      this.hasUnsavedChanges = false;
      
      this.body.updated = new Date().toISOString(); 

      this.showSuccessModal = true;
    },
    error => {
      console.error('Error al guardar Datos Generales:', error);
      this.isLoading = false; 
    }
  );
}

cerrarModalExito(): void {
  this.showSuccessModal = false;
}

  validatePhoneNumber(): void {
    if (this.body.tel_contacto_de_emergencia?.length !== 10) {
      this.showPhoneError = true;
    } else {
      this.showPhoneError = false;
    }
  }

  getSexoDescription(sexo: string): string {
    if (sexo.toLowerCase() === 'f') {
      return 'Femenino';
    } else if (sexo.toLowerCase() === 'm') {
      return 'Masculino';
    } else {
      return 'No especificado'; 
    }
  }

  getEstadoCivilDescription(edo_civil: string): string {
    return this.catalogoEstadoCivil[edo_civil];
  }
}