import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { SharedDataService } from '../services/shared.service';
import { PxService } from '../services/px.service';
import { Modal } from 'bootstrap';
import { estadoCivil } from '../catalogos/paciente';

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
  emailError: boolean = false;
   
  saveError: boolean = false;
  loader: boolean = false;
  showFichaMedica = false;
  showPhoneError: boolean = false;
  estadoCivilArray = Object.entries(estadoCivil);

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

    if (!allFieldsFilled || this.emailError || this.showPhoneError) {
        this.showWarning = true;
    } else {
        this.loader = true;
        const modalElement = document.getElementById('responseModal');
        const modal = new Modal(modalElement!);

        this.pxService.createPaciente(this.formData).subscribe(
            (response: any) => {
                console.log("Paciente registrado con éxito, " + response.message);
                console.log("Paciente actual, ", response.data);

                // Guardar datos en sessionStorage
                sessionStorage.setItem('currentPxId', response.data.id);
                sessionStorage.setItem('s1', JSON.stringify(this.formData)); // Guardar formData

                this.saveError = false;
                this.loader = false;
                this.clearForm();
                modal.show();
            },
            (error: any) => {
                console.log("Error al registrar paciente: " + error.error.error);
                this.saveError = true;
                this.loader = false;
                modal.show();
            }
        );
    }
}

  
  clearForm(): void {
    this.formData = {
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
  }
  

  isFormValid(): boolean {
    return this.formData.nombre && this.formData.apellidoP && this.formData.apellidoM &&
           this.formData.fechaNac && this.formData.sexo && this.formData.estadoCivil &&
           this.formData.tipoSangre && this.formData.telefono && this.formData.email;
  }
  validatePhoneNumber(): void {
    this.showPhoneError = this.formData.telefono.length !== 10;
  }
  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(this.formData.email);
  }
  resetPhoneError(): void {
    this.showPhoneError = false;
  }
  resetEmailError(): void {
    this.emailError = false;
  }

  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }

  validateNumberInput(event: KeyboardEvent): boolean {
   return this.utilService.onlyNumbers(event);
  }
  llenarFicha() {
    this.showFichaMedica = true;
  }
}
