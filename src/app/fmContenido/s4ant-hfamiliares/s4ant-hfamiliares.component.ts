import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-s4ant-hfamiliares',
  templateUrl: './s4ant-hfamiliares.component.html',
  styleUrls: ['./s4ant-hfamiliares.component.scss']
})
export class S4antHfamiliaresComponent implements OnInit {
  formData: any = {};
  body= {
      diabetes_p: '',
      diabetes_e: '',
      neourologicas_p: '',
      neourologicas_e: '',
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
      endonocrilogicas_p:'',
      endonocrilogicas_e:'',
      otras_p:'',
      otras_e:'', 
  }
  idPx: number|null = null;


  constructor( 
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
            this.authService.getById('antecedentesFm','id_paciente', currentPxId).subscribe(
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
    sessionStorage.setItem('s4', JSON.stringify(this.body));
  }
  limpiar(id: any) {
    switch(id) {
      case 'diabetes':
        this.body.diabetes_p = '';
        this.body.diabetes_e = '';
      break;
        case 'neurologica':
        this.body.neourologicas_p = '';
        this.body.neourologicas_e = '';
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
case 'endonocrilogicas':
  this.body.endonocrilogicas_p = '';
  this.body.endonocrilogicas_e = '';
break;
case 'otras':
  this.body.otras_p = '';
  this.body.otras_e = '';
break;
  }
  }
}
