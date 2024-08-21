import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  formData: any = {};
  showMedicalForm: boolean = false;
  showWarning: boolean = false;
  formData2 : any;
  showTable = false;
  formData3: any ;
  showPerinatalesTable = false;
  observaciones: string = '';

  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.isFormValid()) {
      this.showMedicalForm = true;
      this.showWarning = false;
    } else {
      this.showMedicalForm = false;
      this.showWarning = true;
    }
  }
  isFormValid(): boolean {
    return this.formData.nombre && this.formData.apellidoP && this.formData.apellidoM &&
           this.formData.fechaNac && this.formData.sexo && this.formData.estadoCivil &&
           this.formData.tipoSangre && this.formData.telefono && this.formData.email;
  }
  validateNumberInput(event: KeyboardEvent) {
    this.utilService.onlyNumbers(event);
  }
  saveData() {
    const requiredFields = ['pxDeportivo', 'peso', 'temperatura', 'talla', 'fCardiaca'];
  
    if (this.formData.pxDeportivo === 'si') {
      requiredFields.push('disciplina', 'deporte', 'arteCompetitivo');
    }
  
    const isValid = requiredFields.every(field => this.formData[field]);
    
    if (!isValid) {
      alert('Por favor, complete todos los campos requeridos.');
    } else {
      // Código para guardar los datos
    }
  }
  onSwitchChange(event: any) {
    this.showTable = event.target.checked;
  }
  



}