import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';

@Component({
  selector: 'app-s6ant-nopatologicos',
  templateUrl: './s6ant-nopatologicos.component.html',
  styleUrls: ['./s6ant-nopatologicos.component.scss']
})
export class S6antNopatologicosComponent implements OnInit {
  formData: any = {};
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
    habitos_higienicos_p: "",
    habitos_higienicos_e: "",
    zoonosis_p: "",
    zoonosis_e: "",
    actividad_fisica_p: "",
    actividad_fisica_e: "",
    ocupacion_p: "",
    ocupacion_e: "",
    actividad_de_ocio_p: "",
    actividad_de_ocio_e: ""
  }

  constructor( 
    private pxService: PxService,
    private authService: AuthService,    


  ) { }
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
          this.body = response [0];
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }

  guardar() {
    sessionStorage.setItem('s6', JSON.stringify(this.body));
  }
  limpiar(id: any) {
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
      case 'habitos_higienicos':
        this.body.habitos_higienicos_p = '';
        this.body.habitos_higienicos_e = '';
        break;
      case 'zoonosis':
        this.body.zoonosis_p = '';
        this.body.zoonosis_e = '';
        break;
      case 'actividad_fisica':
        this.body.actividad_fisica_p = '';
        this.body.actividad_fisica_e = '';
        break;
      case 'ocupacion':
        this.body.ocupacion_p = '';
        this.body.ocupacion_e = '';
        break;
      case 'actividad_de_ocio':
        this.body.actividad_de_ocio_p = '';
        this.body.actividad_de_ocio_e = '';
        break;
    }
  }
  
}