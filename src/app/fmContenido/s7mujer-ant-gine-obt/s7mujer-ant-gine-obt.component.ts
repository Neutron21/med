import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GinecoObs } from 'src/app/models/gineco-obs';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-s7mujer-ant-gine-obt',
  templateUrl: './s7mujer-ant-gine-obt.component.html',
  styleUrls: ['./s7mujer-ant-gine-obt.component.scss']
})
export class S7mujerAntGineObtComponent implements OnInit {
  
  formData: any = {
    mecarcaSiNo:false,
    dismenorreasSiNo:false,
    gestaActualSiNo:false,
    numeroGestasSiNo:false,
    numeroPartosSiNo:false,
    cesareasSiNo:false,
    abortosSiNo:false,
    nacidosVivosSiNo:false,
    menopausiaSiNo:false,
  };
  showTable = true;
  body: GinecoObs = {
      mecarca_e:'',
      dismenorreas_e:'',
      gestaActual_e:'',
      numeroGestas_e:'',
      numeroPartos_e:'',
      cesareas_e:'',
      abortos_e:'',
      nacidosVivos_e:'',
      menopausia_e:''
  }
  idPx: number|null = null;


  constructor( 
    private pxService: PxService,
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
            this.authService.getById('mujerFm','id_paciente', currentPxId).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.body;
          this.updateFormData();
          this.validarAlturaAll();
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }
  updateFormData() {
    this.formData.mecarcaSiNo = Boolean( this.body.mecarca_e);
    this.formData.dismenorreasSiNo = Boolean( this.body.dismenorreas_e);
    this.formData.gestaActualSiNo = Boolean( this.body.gestaActual_e);
    this.formData.numeroGestasSiNo = Boolean( this.body.numeroGestas_e);
    this.formData.numeroPartosSiNo = Boolean( this.body.numeroPartos_e);
    this.formData.cesareasSiNo = Boolean( this.body.cesareas_e);
    this.formData.abortosSiNo = Boolean( this.body.abortos_e);
    this.formData.nacidosVivosSiNo = Boolean( this.body.nacidosVivos_e);
    this.formData.menopausiaSiNo = Boolean( this.body.menopausia_e);
  }
  guardar() {
    sessionStorage.setItem('s7', JSON.stringify(this.body));
  }

  limpiar($event: any,id: keyof GinecoObs) {
   if (!$event) {
    this.body[id] = ''
    this.resetTextareaHeight(id);
   } else {
     window.setTimeout(function () { 
      document.getElementById(id)?.focus();
    }, 0); 
   }
    this.guardar();
  }
  adjustTextareaHeight(id: string): void {
    debugger
    const textarea = document.getElementById(id)
    textarea!.style.height = 'auto';
    textarea!.style.height = `${textarea!.scrollHeight}px`;
  }
  resetTextareaHeight(id: string): void {
    const textarea = document.getElementById(id)
    textarea!.style.height = 'auto';
  }
  validarAlturaAll() {
    setTimeout( () => { 
      this.adjustTextareaHeight('mecarca_e');
      this.adjustTextareaHeight('dismenorreas_e');
      this.adjustTextareaHeight('gestaActual_e');
      this.adjustTextareaHeight('numeroGestas_e');
      this.adjustTextareaHeight('numeroPartos_e');
      this.adjustTextareaHeight('cesareas_e');
      this.adjustTextareaHeight('abortos_e');
      this.adjustTextareaHeight('nacidosVivos_e');
      this.adjustTextareaHeight('menopausia_e');
    }, 0); 
  }

}
