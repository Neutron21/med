import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { SharedDataService } from '../services/shared.service';
import { PxService } from '../services/px.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  formData: any = {
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    fechaNac: '',
    sexo: '',
    estadoCivil: '',
    tipoSangre: '',
    telefono: '',
    email: ''
  };
  showWarning: boolean = false;
  showTable = false;
  emailError: boolean = false;
  showFichaMedica = false;
  phoneError: boolean = false;
  showPhoneError: boolean = false;

  constructor(
    private utilService: UtilService,
    private sharedDataService: SharedDataService,
    private pxService: PxService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.validateEmail();
    this.validatePhoneNumber();

    const allFieldsFilled = this.isFormValid();

    if (!allFieldsFilled || this.emailError || this.phoneError) {
      this.showWarning = true;
    } else {
      this.showWarning = false;
      this.showFichaMedica = true;
      console.log('Formulario enviado:', this.formData);
      this.pxService.createPaciente(this.formData).subscribe((response: any) => {
        console.log("Paciente registrado con éxito, " + response.message);
        console.log("Paciente actual, ", response.data);
        sessionStorage.setItem('currentPxId', response.data.id);
      }, (error: any) => {
        console.log("Error al registrar paciente: " + error.error.error);
      });
    }
  }

  isFormValid(): boolean {
    return this.formData.nombre && this.formData.apellidoP && this.formData.apellidoM &&
           this.formData.fechaNac && this.formData.sexo && this.formData.estadoCivil &&
           this.formData.tipoSangre && this.formData.telefono && this.formData.email;
  }

  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(this.formData.email)) {
      this.emailError = true;
    } else {
      this.emailError = false; 
    }
  }

  resetEmailError(): void {
    this.emailError = false;
  }

  resetPhoneError(): void {
    this.showPhoneError = false;
  }

  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }

  validatePhoneNumber(): void {
    if (this.formData.telefono.length !== 10) {
      this.showPhoneError = true;
    } else {
      this.showPhoneError = false;
    }
  }

  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^[0-9]+$/.test(inputChar)) {
      event.preventDefault(); // Evitar caracteres no numéricos
    }
  }
}
