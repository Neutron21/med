import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { SharedDataService } from '../services/shared.service';
import { PxService } from '../services/px.service';
import { Modal } from 'bootstrap';

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
  phoneError: boolean = false; 
  saveError: boolean = false;
  loader: boolean = false;

  constructor(
    private utilService: UtilService,
    private sharedDataService: SharedDataService,
    private pxService: PxService
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    
    const allFieldsFilled = this.isFormValid();

    if (!allFieldsFilled || this.emailError) {
      this.showWarning = true;
    } else {
      this.loader = true;
      const modalElement = document.getElementById('responseModal');
      const modal = new Modal(modalElement!);
      modal.show();
      this.showWarning = false;
    
      console.log('Formulario enviado:', this.formData);
      this.pxService.createPaciente(this.formData).subscribe((response: any) => {
        console.log("Paciente registrado con éxito, " + response.message);
        console.log("Paciente actual, " , response.data);
        sessionStorage.setItem('currentPxId', response.data.id);
        this.saveError = false;
        this.loader = false;
      }, (error: any) =>{
        console.log("Error al registrar paciente: " + error.error.error);
        this.saveError = true;
        this.loader = false;
      });
    }
  }

  isFormValid(): boolean {
    return this.formData.nombre && this.formData.apellidoP && this.formData.apellidoM &&
           this.formData.fechaNac && this.formData.sexo && this.formData.estadoCivil &&
           this.formData.tipoSangre && this.formData.telefono && this.formData.email;
  }

  validateNumberInput(event: KeyboardEvent): void {
    this.utilService.onlyNumbers(event);
  }

  validateEmail(email: string): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(email);
  }
  validatePhoneNumber(phone: string): void {
    this.phoneError = phone.length !== 10;
  }
  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
}
