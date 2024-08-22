import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { SharedDataService } from '../services/shared.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  formData: any = {};
  showWarning: boolean = false;
  formData2 : any;
  showTable = false;
  formData3: any ;
  showPerinatalesTable = false;
  observaciones: string = '';
  

  constructor(
    private utilService: UtilService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.isFormValid()) {
      this.showWarning = false;
    } else {
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
  
  onSwitchChange(event: any) {
    this.showTable = event.target.checked;
  }

  }
  




