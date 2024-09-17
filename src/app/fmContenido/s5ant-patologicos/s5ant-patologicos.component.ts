import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-s5ant-patologicos',
  templateUrl: './s5ant-patologicos.component.html',
  styleUrls: ['./s5ant-patologicos.component.scss']
})
export class S5antPatologicosComponent implements OnInit {
  formData: any = {};
  body = {
	diabetes_p: '',
  diabetes_e: '',
  alergias_p: '',
  alergias_e: '',
  accidentes_p: '',
  accidentes_e: '',
  neoplasias_p: '',
  neoplasias_e: '',
  cardiopatias_p: '',
  cardiopatias_e: '',
  cirugias_p: '',
  cirugias_e: '',
  respiratorias_p: '',
  respiratorias_e: '',
  dolor_cabeza_p: '',
  dolor_cabeza_e: '',
  malformaciones_congenitas_p: '',
  malformaciones_congenitas_e: '',
  neurologicas_p: '',
  neurologicas_e: '',
  convulsiones_epilepsias_p: '',
  convulsiones_epilepsias_e: '',
  traumatismos_p: '',
  traumatismos_e: '',
  efermedadesInfecciosas_p:'',
  efermedadesInfecciosas_e:'',
  reumaticas_p:'',
  reumaticas_e:'',
  hospitalizacionesPrevias_p:'',
  hospitalizacionesPrevias_e:'',
  otras_p:'',
  otras_e:''
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
            this.authService.getById('antecedentesPatFm','id_paciente', currentPxId).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.body;
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
    sessionStorage.setItem('s5', JSON.stringify(this.body));
  };
  limpiar(id: any) {
    switch (id) {
      case 'diabetes':
        this.body.diabetes_p = '';
        this.body.diabetes_e = '';
        break;
      case 'alergias':
        this.body.alergias_p = '';
        this.body.alergias_e = '';
        break;
      case 'accidentes':
        this.body.accidentes_p = '';
        this.body.accidentes_e = '';
        break;
      case 'neoplasias':
        this.body.neoplasias_p = '';
        this.body.neoplasias_e = '';
        break;
      case 'cardiopatías':
        this.body.cardiopatias_p = '';
        this.body.cardiopatias_e = '';
        break;
      case 'cirugías':
        this.body.cirugias_p = '';
        this.body.cirugias_e = '';
        break;
      case 'respiratorias':
        this.body.respiratorias_p = '';
        this.body.respiratorias_e = '';
        break;
      case 'dolor_cabeza':
        this.body.dolor_cabeza_p = '';
        this.body.dolor_cabeza_e = '';
        break;
      case 'malformaciones_congenitas':
        this.body.malformaciones_congenitas_p = '';
        this.body.malformaciones_congenitas_e = '';
        break;
      case 'neurologicas':
        this.body.neurologicas_p = '';
        this.body.neurologicas_e = '';
        break;
      case 'convulsiones_epilepsias':
        this.body.convulsiones_epilepsias_p = '';
        this.body.convulsiones_epilepsias_e = '';
        break;
      case 'traumatismos':
        this.body.traumatismos_p = '';
        this.body.traumatismos_e = '';
        break;
      case 'enfermedadesInfecciosas':
        this.body.efermedadesInfecciosas_p = '';
        this.body.efermedadesInfecciosas_e = '';
        break;
      case 'reumaticas':
        this.body.reumaticas_p = '';
        this.body.reumaticas_e = '';
        break;
      case 'hospitalizacionesPrevias':
        this.body.hospitalizacionesPrevias_p = '';
        this.body.hospitalizacionesPrevias_e = '';
        break;
      case 'otras':
        this.body.otras_p = '';
        this.body.otras_e = '';
        break;
    }
    

  }
}