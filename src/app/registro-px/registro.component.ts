import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { SharedDataService } from '../services/shared.service';

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

  constructor(
    private utilService: UtilService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Verificar si todos los campos están llenos
    const allFieldsFilled = this.isFormValid();

    if (!allFieldsFilled || this.emailError) {
      this.showWarning = true;
    } else {
      this.showWarning = false;
      // Mostrar el componente FichaMedica al enviar el formulario
      this.showFichaMedica = true;
      // Aquí puedes agregar la lógica para enviar el formulario o guardar los datos
      console.log('Formulario enviado:', this.formData);
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

  onSwitchChange(event: any): void {
    this.showTable = event.target.checked;
  }

  validateEmail(email: string): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(email);
  }
  validatePhoneNumber(phone: string): void {
    this.phoneError = phone.length !== 10;
  }
}
