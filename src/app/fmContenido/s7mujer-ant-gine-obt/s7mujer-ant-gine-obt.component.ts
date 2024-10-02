import { Component, OnInit } from '@angular/core';
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
    abortoSiNo:false,
    nacidosVivosSiNo:false,
    menopausiaSiNo:false,
  };
  showTable = false;
  body = {
      mecarca_p:'', 
      mecarca_e:'',
      dismenorreas_p:'', 
      dismenorreas_e:'',
      gestaActual_p:'',
      gestaActual_e:'',
      numeroGestas_p:'', 
      numeroGestas_e:'',
      numeroPartos_p:'', 
      numeroPartos_e:'',
      cesareas_p:'', 
      cesareas_e:'',
      abortos_p:'', 
      abortos_e:'',
      nacidosVivos_p:'', 
      nacidosVivos_e:'',
      menopausia_p:'', 
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
    this.formData.mecarcaSiNo = Boolean(this.body.mecarca_p || this.body.mecarca_e);
    this.formData.dismenorreasSiNo = Boolean(this.body.dismenorreas_p || this.body.dismenorreas_e);
    this.formData.gestaActualSiNo = Boolean(this.body.gestaActual_p || this.body.gestaActual_e);
    this.formData.numeroGestasSiNo = Boolean(this.body.numeroGestas_p || this.body.numeroGestas_e);
    this.formData.numeroPartosSiNo = Boolean(this.body.numeroPartos_p || this.body.numeroPartos_e);
    this.formData.cesareasSiNo = Boolean(this.body.cesareas_p || this.body.cesareas_e);
    this.formData.abortoSiNo = Boolean(this.body.abortos_p || this.body.abortos_e);
    this.formData.nacidosVivosSiNo = Boolean(this.body.nacidosVivos_p || this.body.nacidosVivos_e);
    this.formData.menopausiaSiNo = Boolean(this.body.menopausia_p || this.body.menopausia_e);
  }

  guardar() {
    sessionStorage.setItem('s7', JSON.stringify(this.body));
  }

  limpiar($event: any,id: string) {
    console.log($event);
    switch (id) {
      case 'mecarca':
        this.body.mecarca_p = '';
        this.body.mecarca_e = '';
        break;
      case 'dismenorreas':
        this.body.dismenorreas_p = '';
        this.body.dismenorreas_e = '';
        break;
      case 'gestaActual':
        this.body.gestaActual_p = '';
        this.body.gestaActual_e = '';
        break;
      case 'numeroGestas':
        this.body.numeroGestas_p = '';
        this.body.numeroGestas_e = '';
        break;
      case 'numeroPartos':
        this.body.numeroPartos_p = '';
        this.body.numeroPartos_e = '';
        break;
      case 'cesareas':
        this.body.cesareas_p = '';
        this.body.cesareas_e = '';
        break;
      case 'aborto':
        this.body.abortos_p = '';
        this.body.abortos_e = '';
        break;
      case 'nacidosVivos':
        this.body.nacidosVivos_p = '';
        this.body.nacidosVivos_e = '';
        break;
      case 'menopausia':
        this.body.menopausia_p = '';
        this.body.menopausia_e = '';
        break;
     
    }
    this.guardar();
  }

}
