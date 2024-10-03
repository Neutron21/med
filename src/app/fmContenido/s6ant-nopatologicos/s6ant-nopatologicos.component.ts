import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-s6ant-nopatologicos',
  templateUrl: './s6ant-nopatologicos.component.html',
  styleUrls: ['./s6ant-nopatologicos.component.scss']
})
export class S6antNopatologicosComponent implements OnInit {
  formData: any = {
    toxicomaniasSiNo: false,
    inmunizacionesSiNo: false,
    automedicacionSiNo: false,
    trastornosSuenoSiNo: false,
    alimentacionSiNo: false,
    habitacionSiNo: false,
    habitosHigienicosSiNo: false,
    zoonosisSiNo: false,
    actividadFisicaSiNo: false,
    ocupacionSiNo: false,
    actividadesOcioSiNo: false,
  };
  body = {
    toxicomanias_p: "",
    toxicomanias_e: "",
    inmunizaciones_p: "",
    inmunizaciones_e: "",
    automedicacion_p: "",
    automedicacion_e: "",
    transtornoSueno_p: "",
    transtornoSueno_e: "",
    alimentacion_p: "",
    alimentacion_e: "",
    habitacion_p: "",
    habitacion_e: "",
    habitosHigienicos_p: "",
    habitosHigienicos_e: "",
    zoonosis_p: "",
    zoonosis_e: "",
    actividadFisica_p: "",
    actividadFisica_e: "",
    ocupacion_p: "",
    ocupacion_e: "",
    actividadOcio_p: "",
    actividadOcio_e: ""
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
            this.authService.getById('antecedentesNoPatFm','id_paciente', currentPxId).subscribe(
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
    this.formData.toxicomaniasSiNo = Boolean(this.body.toxicomanias_p || this.body.toxicomanias_e);
    this.formData.inmunizacionesSiNo = Boolean(this.body.inmunizaciones_p || this.body.inmunizaciones_e);
    this.formData.automedicacionSiNo = Boolean(this.body.automedicacion_p || this.body.automedicacion_e);
    this.formData.transtornoSuenoSiNo = Boolean(this.body.transtornoSueno_p || this.body.transtornoSueno_e);
    this.formData.alimentacionSiNo = Boolean(this.body.alimentacion_p || this.body.alimentacion_e);
    this.formData.habitacionSiNo = Boolean(this.body.habitacion_p || this.body.habitacion_e);
    this.formData.habitosHigienicosSiNo = Boolean(this.body.habitosHigienicos_p || this.body.habitosHigienicos_e);
    this.formData.zoonosisSiNo = Boolean(this.body.zoonosis_p || this.body.zoonosis_e);
    this.formData.actividadFisicaSiNo = Boolean(this.body.actividadFisica_p || this.body.actividadFisica_e);
    this.formData.ocupacionSiNo = Boolean(this.body.ocupacion_p || this.body.ocupacion_e);
    this.formData.actividadDeOcioSiNo = Boolean(this.body.actividadOcio_p || this.body.actividadOcio_e);
  };

  guardar() {
    sessionStorage.setItem('s6', JSON.stringify(this.body));
  }
  limpiar($event: any,id: string) {
    console.log($event);
    switch (id) {
      case 'toxicomanias':
        this.body.toxicomanias_p = '';
        this.body.toxicomanias_e = '';
        break;
      case 'inmunizaciones':
        this.body.inmunizaciones_p = '';
        this.body.inmunizaciones_e = '';
        break;
      case 'automedicacion':
        this.body.automedicacion_p = '';
        this.body.automedicacion_e = '';
        break;
      case 'transtornoSueno':
        this.body.transtornoSueno_p = '';
        this.body.transtornoSueno_e = '';
        break;
      case 'alimentacion':
        this.body.alimentacion_p = '';
        this.body.alimentacion_e = '';
        break;
      case 'habitacion':
        this.body.habitacion_p = '';
        this.body.habitacion_e = '';
        break;
      case 'habitosHigienicos':
        this.body.habitosHigienicos_p = '';
        this.body.habitosHigienicos_e = '';
        break;
      case 'zoonosis':
        this.body.zoonosis_p = '';
        this.body.zoonosis_e = '';
        break;
      case 'actividadFisica':
        this.body.actividadFisica_p = '';
        this.body.actividadFisica_e = '';
        break;
      case 'ocupacion':
        this.body.ocupacion_p = '';
        this.body.ocupacion_e = '';
        break;
      case 'actividadOcio':
        this.body.actividadOcio_p = '';
        this.body.actividadOcio_e = '';
        break;
    }
    this.guardar();
  }
  
  
}