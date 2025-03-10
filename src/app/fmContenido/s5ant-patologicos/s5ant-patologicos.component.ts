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
  formData: any = {
    diabetesSiNo: false ,
    alergiasSiNo: false ,
    accidentesSiNo: false ,
    neoplasiasSiNo: false ,
    cardiopatiasSiNo: false ,
    cirugiasSiNo: false ,
    respiratoriasSiNo: false ,
    dolorCabezaSiNo: false ,
    neurologicasSiNo: false ,
    malformacionesGeneticasSiNo: false ,
    traumatismosSiNo: false ,
    enfermedadesInfecciosasSiNo: false ,
    reumaticasSiNo: false ,
    hospitalizacionesPreviasSiNo: false,
    convulsionesSiNo:false,
    otrasSiNo: false,

  };
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
  dolorCabeza_p: '',
  dolorCabeza_e: '',
  malformacionesGeneticas_p: '',
  malformacionesGeneticas_e: '',
  neurologicas_p: '',
  neurologicas_e: '',
  convulsiones_p: '',
  convulsiones_e: '',
  traumatismos_p: '',
  traumatismos_e: '',
  enfermedadesInfecciosas_p:'',
  enfermedadesInfecciosas_e:'',
  reumaticas_p:'',
  reumaticas_e:'',
  hospitalizacionesPrevias_p:'',
  hospitalizacionesPrevias_e:'',
  otras_p:'',
  otras_e:''
}
initBody = JSON.parse(JSON.stringify(this.body)); 
idPx: number|null = null;
isLoading: boolean = false;



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
      this.isLoading = true;
      this.authService.getById('antecedentesFm','id_paciente', currentPxId).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.initBody;
          this.updateFormData();
  
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
  
          this.isLoading = false;
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }
  updateFormData() {
    this.formData.diabetesSiNo = Boolean(this.body.diabetes_p || this.body.diabetes_e);
    this.formData.alergiasSiNo = Boolean(this.body.alergias_p || this.body.alergias_e);
    this.formData.accidentesSiNo = Boolean(this.body.accidentes_p || this.body.accidentes_e);
    this.formData.neoplasiasSiNo = Boolean(this.body.neoplasias_p || this.body.neoplasias_e);
    this.formData.cardiopatiasSiNo = Boolean(this.body.cardiopatias_p || this.body.cardiopatias_e);
    this.formData.cirugiasSiNo = Boolean(this.body.cirugias_p || this.body.cirugias_e);
    this.formData.respiratoriasSiNo = Boolean(this.body.respiratorias_p || this.body.respiratorias_e);
    this.formData.dolorCabezaSiNo = Boolean(this.body.dolorCabeza_p || this.body.dolorCabeza_e);
    this.formData.malformacionesGeneticasSiNo = Boolean(this.body.malformacionesGeneticas_p || this.body.malformacionesGeneticas_e);
    this.formData.neurologicasSiNo = Boolean(this.body.neurologicas_p || this.body.neurologicas_e);
    this.formData.convulsionesSiNo = Boolean(this.body.convulsiones_p || this.body.convulsiones_e);
    this.formData.traumatismosSiNo = Boolean(this.body.traumatismos_p || this.body.traumatismos_e);
    this.formData.enfermedadesInfecciosasSiNo = Boolean(this.body.enfermedadesInfecciosas_p || this.body.enfermedadesInfecciosas_e);
    this.formData.reumaticasSiNo = Boolean(this.body.reumaticas_p || this.body.reumaticas_e);
    this.formData.hospitalizacionesPreviasSiNo = Boolean(this.body.hospitalizacionesPrevias_p || this.body.hospitalizacionesPrevias_e);
    this.formData.otrasSiNo = Boolean(this.body.otras_p || this.body.otras_e);
}


  guardar() {
    sessionStorage.setItem('s5', JSON.stringify(this.body));
  };
  
   limpiar($event: any,id: string) {
    console.log($event);
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
      case 'cardiopatias':
        this.body.cardiopatias_p = '';
        this.body.cardiopatias_e = '';
        break;
      case 'cirugias':
        this.body.cirugias_p = '';
        this.body.cirugias_e = '';
        break;
      case 'respiratorias':
        this.body.respiratorias_p = '';
        this.body.respiratorias_e = '';
        break;
      case 'dolorCabeza':
        this.body.dolorCabeza_p = '';
        this.body.dolorCabeza_e = '';
        break;
      case 'malformacionesGeneticas':
        this.body.malformacionesGeneticas_p = '';
        this.body.malformacionesGeneticas_e = '';
        break;
      case 'neurologicas':
        this.body.neurologicas_p = '';
        this.body.neurologicas_e = '';
        break;
      case 'convulsiones':
        this.body.convulsiones_p = '';
        this.body.convulsiones_e = '';
        break;
      case 'traumatismos':
        this.body.traumatismos_p = '';
        this.body.traumatismos_e = '';
        break;
      case 'enfermedadesInfecciosas':
        this.body.enfermedadesInfecciosas_p = '';
        this.body.enfermedadesInfecciosas_e = '';
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
    this.guardar();

  }
}