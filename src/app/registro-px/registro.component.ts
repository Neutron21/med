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

  secciones = {
    s1: true,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
    s7: false,
    s8: false, 
    s9: false
  }
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
  bodyS1: any = {
    contacto_de_emergencia: "",
    escolaridad: "",
    id_paciente: 0,
    lugar_de_residencia: "",
    medico_tratante: "",
    nacionalidad: "",
    ocupacion: "",
    religion: "",
    remision: "",
    tel_contacto_de_emergencia: ""
  }
  showWarning: boolean = false;
  emailError: boolean = false;
   
  saveError: boolean = false;
  loader: boolean = false;
  showFichaMedica = false;
  showPhoneError: boolean = false;
  estadoCivilArray = Object.entries(estadoCivil);
  redirectToFichaMedica: any;
  responseModal: any;
  fichaModal: any;

  constructor(
    private utilService: UtilService,
    private sharedDataService: SharedDataService,
    private pxService: PxService
  ) { }

  ngOnInit(): void {
    const responseModal = document.getElementById('responseModal');
    const fichaModal = document.getElementById('fichaModal');
    this.responseModal = new Modal(responseModal!);
    this.fichaModal = new Modal(fichaModal!);
  }

  onSubmit(): void {
    if (this.loader) {
      return;
    }

    this.validateEmail();
    this.validatePhoneNumber();

    const allFieldsFilled = this.isFormValid();

    if (!allFieldsFilled || this.emailError || this.showPhoneError) {
      this.showWarning = !allFieldsFilled;
      return;
    }

    this.showWarning = false;
    this.loader = true;
        
    this.pxService.createPaciente(this.formData).subscribe(
            (response: any) => {
                console.log("Paciente registrado con éxito, " + response.message);
                console.log("Paciente actual, ", response.data);

                // Guardar datos en sessionStorage
                sessionStorage.setItem('currentPxId', response.data.id);
                this.bodyS1.id_paciente = response.data.id;
                sessionStorage.setItem('s1', JSON.stringify(this.bodyS1));

                this.saveError = false;
                this.clearForm();
                this.responseModal.show();
                this.loader = false;
            },
            (error: any) => {
              this.loader = false;
              console.log("Error al registrar paciente: " + (error.error?.error || error.message));
                this.saveError = true;
                this.responseModal.show();
            }
            );
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
  masTarde() {
    this.sharedDataService.cleanSessionStorage();
  }

  isFormValid(): boolean {
    return Boolean(this.formData.nombre && this.formData.apellidoP && this.formData.apellidoM &&
           this.formData.fechaNac && this.formData.sexo && this.formData.estadoCivil &&
           this.formData.tipoSangre && this.formData.telefono && this.formData.email);
  }
  validatePhoneNumber(): void {
    this.showPhoneError = !/^\d{10}$/.test(this.formData.telefono || '');
  }
  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(this.formData.email || '');
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
    sessionStorage.setItem('currentSection', 's1');
    this.sharedDataService.updateSeccion(this.secciones);

    this.fichaModal.show();
  }
  async resetModal() { // GUARDAMOS Y BORRAMOS DATOS DE FICHA MEDICA en SessionStorage
  
    this.fichaModal.hide();
    await Object.keys(this.secciones).forEach(key => {
      console.log(key);
       this.sharedDataService.seccionesCompletadas(key);
    });
 
    this.sharedDataService.cleanSessionStorage();
    sessionStorage.removeItem('currentPxId');
  }
}
