import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-s4ant-hfamiliares',
  templateUrl: './s4ant-hfamiliares.component.html',
  styleUrls: ['./s4ant-hfamiliares.component.scss']
})
export class S4antHfamiliaresComponent implements OnInit, OnDestroy {
formData =  {
    diabetesSiNo: false,
    neurologicasSiNo:false,
    alergiasSiNo: false,
    hasSiNo: false,
    neoplasiasSiNo: false,
    cardiopatiasSiNo: false,
    reumaticasSiNo: false,
    respiratoriasSiNo: false,
    geneticasSiNo: false,
    endocrinologasSiNo: false,
    otrasSiNo: false,
};
  body= {
      diabetes_p: '',
      diabetes_e: '',
      neurologicas_p: '',
      neurologicas_e: '',
      has_p:'',
      has_e:'',
      neoplasias_p:'',
      neoplasias_e:'',
      cardiopatias_p:'',
      cardiopatias_e:'',
      reumaticas_p:'',
      reumaticas_e:'',
      respiratorias_p:'',
      respiratorias_e:'',
      geneticas_p:'',
      geneticas_e:'',
      endocrinologas_p:'',
      endocrinologas_e:'',
      otras_p:'',
      otras_e:'', 
  }
  initBody = JSON.parse(JSON.stringify(this.body)); 
  idPx: number|null = null;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor( 
    private authService: AuthService,    
    private sharedDataService: SharedDataService
  ) {  }

  ngOnInit(): void {
    this.checkCurrentPxId();
    this.sharedDataService.idPacienteObservable.pipe(takeUntil(this.destroy$)).subscribe(id => {
          this.idPx = id;
          this.checkCurrentPxId();
        })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // console.log('Suscripción destruida ✅ S4');
  }
  checkCurrentPxId(): void {
    this.isLoading = true;
    let currentPxId = sessionStorage.getItem('currentPxId');
    if (!!currentPxId) {
      console.log('ID actual del paciente', currentPxId);
      const apiCall = this.authService.getById('antecedentesFm','id_paciente', currentPxId);
      this.sharedDataService.loadSectionData('s4', apiCall, this.initBody).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.initBody;
          this.updateFormData();
          this.isLoading = false;
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
    sessionStorage.setItem('s4', JSON.stringify(this.body));
  }
  updateFormData() {
    this.formData.diabetesSiNo = Boolean (this.body.diabetes_p || this.body.diabetes_e);
    this.formData.neurologicasSiNo = Boolean (this.body.neurologicas_p || this.body.neurologicas_e);
    this.formData.hasSiNo = Boolean (this.body.has_p || this.body.has_e);
    this.formData.neoplasiasSiNo = Boolean (this.body.neoplasias_p || this.body.neoplasias_e);
    this.formData.cardiopatiasSiNo = Boolean (this.body.cardiopatias_p || this.body.cardiopatias_e);
    this.formData.reumaticasSiNo = Boolean (this.body.reumaticas_p || this.body.reumaticas_e);
    this.formData.respiratoriasSiNo = Boolean (this.body.respiratorias_p || this.body.respiratorias_e);
    this.formData.geneticasSiNo = Boolean (this.body.geneticas_p || this.body.geneticas_e);
    this.formData.endocrinologasSiNo = Boolean (this.body.endocrinologas_p || this.body.endocrinologas_e);
    this.formData.otrasSiNo = Boolean (this.body.otras_p || this.body.otras_e);
  }
  limpiar($event: any,id: string) {
    console.log($event);
    
    switch(id) {
      case 'diabetes':
        this.body.diabetes_p = '';
        this.body.diabetes_e = '';
      break;
        case 'neurologicas':
        this.body.neurologicas_p = '';
        this.body.neurologicas_e = '';
      break;
        case 'has':
          this.body.has_p = '';
          this.body.has_e = '';
      break;
      case 'neoplasias':
        this.body.neoplasias_p = '';
        this.body.neoplasias_e = '';
    break;
    case 'cardiopatias':
      this.body.cardiopatias_p = '';
      this.body.cardiopatias_e = '';
  break;
  case 'reumaticas':
    this.body.reumaticas_p = '';
    this.body.reumaticas_e = '';
   break;
   case 'respiratorias':
  this.body.respiratorias_p = '';
  this.body.respiratorias_e = '';
   break;
   case 'geneticas':
   this.body.geneticas_p = '';
  this.body.geneticas_e = '';
  break;
  case 'endocrinologas':
  this.body.endocrinologas_p = '';
  this.body.endocrinologas_e = '';
  break;
  case 'otras':
  this.body.otras_p = '';
  this.body.otras_e = '';
  break;
  }
  this.guardar();

  }

}
