import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { estadoCivil } from 'src/app/catalogos/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s1datos-generales',
  templateUrl: './s1datos-generales.component.html',
  styleUrls: ['./s1datos-generales.component.scss']
})
export class S1datosGeneralesComponent implements OnInit {
  body = {
    id_paciente: 0,
    escolaridad: "",
    ocupacion: "",
    religion: "",
    nacionalidad: "",
    contacto_de_emergencia: "",
    tel_contacto_de_emergencia: "",
    medico_tratante: "",
    lugar_de_recidencia: "",
    remision: ""
  };

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

  showPhoneError: boolean = false;
  idPx: number | null = null;

  constructor(
    private utilService: UtilService,
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {
    this.sharedDataService.idPacienteObservable.subscribe(id => {
      this.idPx = id;
      this.checkCurrentPxId();
    })
  }

  ngOnInit(): void {
    this.checkCurrentPxId();
   
}


  checkCurrentPxId(): void {
    let currentPxId = sessionStorage.getItem('currentPxId');
    if (!!currentPxId) {
      console.log('ID actual del paciente', currentPxId);
      this.authService.getById('datosGeneralesFm', 'id_paciente', currentPxId).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          if (response.length > 0) {
            this.body = response[0];
            this.llenarDatosGen(currentPxId)   
          }
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
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
          console.log('Respuesta de la API para infoPx:', response);
          if (response.length > 0) {
            this.infoPx = response[0]; 
          } else {
            console.warn('No se encontraron datos para el ID del paciente:', currentPxId);
          }
        }, error => {
          console.error('Error al obtener los datos:', error);
        });
    } else {
      console.warn('ID del paciente no válido');
    }
  }
  
  
  
  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    return this.utilService.onlyNumbers(event);
  }

  guardar(): void {
    sessionStorage.setItem('s1', JSON.stringify(this.body));
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
  catalogoEstadoCivil: { [key: string]: string } = estadoCivil;

  getEstadoCivilDescription(edo_civil: string): string {
    return this.catalogoEstadoCivil[edo_civil] || 'No especificado';
  }
}
