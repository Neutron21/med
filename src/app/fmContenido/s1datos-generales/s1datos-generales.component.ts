import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  // Nuevo objeto para almacenar la información del paciente
  formData = {
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    fechaNac: "",
    sexo: "",
    estadoCivil: "",
    tipoSangre: "",
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
    const storedData = sessionStorage.getItem('s1');
    if (storedData) {
      this.formData = JSON.parse(storedData);
    } else {
      console.warn('No hay datos en sessionStorage para el paciente.');
    }
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

            // Asignar los campos adicionales a formData
            this.formData.nombre = response[0].nombre; // Asegúrate de que tu API devuelva estos campos
            this.formData.apellidoP = response[0].apellidoP;
            this.formData.apellidoM = response[0].apellidoM;
            this.formData.fechaNac = response[0].fechaNac;
            this.formData.sexo = response[0].sexo;
            this.formData.estadoCivil = response[0].estadoCivil;
            this.formData.tipoSangre = response[0].tipoSangre;
            this.formData.telefono = response[0].telefono; // O el campo correspondiente
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
}
