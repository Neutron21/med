import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-s8pediatrico-antperinatales',
  templateUrl: './s8pediatrico-antperinatales.component.html',
  styleUrls: ['./s8pediatrico-antperinatales.component.scss']
})
export class S8pediatricoAntperinatalesComponent implements OnInit {
  showPerinatalesTable = false;
  formData: any = {
    numEmbarazoSiNo: false,
    embarazoMultipleSiNo: false,
    alimentacionEmbarazoSiNo: false,
    controlPerinatalSiNo: false,
    vidaUterinaSiNo: false,
    partoCesareaSiNo: false,
    problemasEmbarazoPartoSiNo: false,
    traumatismoEmbarazoPartoSiNo: false,
    maniobrasReanimacionSiNo: false,
    incubadoraSiNo: false,
    pesoMedidaSiNo: false,
    tamizMetabolicoSiNo: false,
    puntajeApgarSiNo: false
  };

  body = {
  numEmbarazo_p:'', 
  numEmbarazo_e:'', 
  embarazoMultiple_p:'', 
  embarazoMultiple_e:'', 
  alimentacionEmbarazo_p:'', 
  alimentacionEmbarazo_e:'',  
  controlPerinatal_p:'',   
  controlPerinatal_e:'',  
  vidaUterina_p:'',  
  vidaUterina_e:'',  
  partoCesarea_p:'', 
  partoCesarea_e:'', 
  problemasEmbarazoParto_p:'', 
  problemasEmbarazoParto_e:'', 
  traumatismoEmbarazoParto_p:'', 
  traumatismoEmbarazoParto_e:'',  
  maniobrasReanimacion_p:'',  
  maniobrasReanimacion_e:'',
  incubadora_p:'',  
  incubadora_e:'',  
  pesoMedida_p:'',  
  pesoMedida_e:'', 
  tamizMetabolico_p:'', 
  tamizMetabolico_e:'', 
  PuntajeAPGAR_p:'',
  PuntajeAPGAR_e:'' 
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
            this.authService.getById('pediatricoFm','id_paciente', currentPxId).subscribe(
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
    this.formData.numEmbarazoSiNo = Boolean(this.body.numEmbarazo_p || this.body.numEmbarazo_e);
    this.formData.embarazoMultipleSiNo = Boolean(this.body.embarazoMultiple_p || this.body.embarazoMultiple_e);
    this.formData.alimentacionEmbarazoSiNo = Boolean(this.body.alimentacionEmbarazo_p || this.body.alimentacionEmbarazo_e);
    this.formData.controlPerinatalSiNo = Boolean(this.body.controlPerinatal_p || this.body.controlPerinatal_e);
    this.formData.vidaUterinaSiNo = Boolean(this.body.vidaUterina_p || this.body.vidaUterina_e);
    this.formData.partoCesareaSiNo = Boolean(this.body.partoCesarea_p || this.body.partoCesarea_e);
    this.formData.problemasEmbarazoPartoSiNo = Boolean(this.body.problemasEmbarazoParto_p || this.body.problemasEmbarazoParto_e);
    this.formData.traumatismoEmbarazoPartoSiNo = Boolean(this.body.traumatismoEmbarazoParto_p || this.body.traumatismoEmbarazoParto_e);
    this.formData.maniobrasReanimacionSiNo = Boolean(this.body.maniobrasReanimacion_p || this.body.maniobrasReanimacion_e);
    this.formData.incubadoraSiNo = Boolean(this.body.incubadora_p || this.body.incubadora_e);
    this.formData.pesoMedidaSiNo = Boolean(this.body.pesoMedida_p || this.body.pesoMedida_e);
    this.formData.tamizMetabolicoSiNo = Boolean(this.body.tamizMetabolico_p || this.body.tamizMetabolico_e);
    this.formData.puntajeApgarSiNo = Boolean(this.body.PuntajeAPGAR_p || this.body.PuntajeAPGAR_e);
  }
  

  guardar() {
    sessionStorage.setItem('s8', JSON.stringify(this.body));
  }

  limpiar($event: any,id: string) {
    console.log($event);
    switch (id) {
      case 'numEmbarazo':
        this.body.numEmbarazo_p = '';
        this.body.numEmbarazo_e = '';
        break;
      case 'embarazoMultiple':
        this.body.embarazoMultiple_p = '';
        this.body.embarazoMultiple_e = '';
        break;
      case 'alimentacionEmbarazo':
        this.body.alimentacionEmbarazo_p = '';
        this.body.alimentacionEmbarazo_e = '';
        break;
      case 'controlPerinatal':
        this.body.controlPerinatal_p = '';
        this.body.controlPerinatal_e = '';
        break;
      case 'vidaUterina':
        this.body.vidaUterina_p = '';
        this.body.vidaUterina_e = '';
        break;
      case 'partoCesarea':
        this.body.partoCesarea_p = '';
        this.body.partoCesarea_e = '';
        break;
      case 'problemasEmbarazoParto':
        this.body.problemasEmbarazoParto_p = '';
        this.body.problemasEmbarazoParto_e = '';
        break;
      case 'traumatismoEmbarazoParto':
        this.body.traumatismoEmbarazoParto_p = '';
        this.body.traumatismoEmbarazoParto_e = '';
        break;
      case 'maniobrasReanimacion':
        this.body.maniobrasReanimacion_p = '';
        this.body.maniobrasReanimacion_e = '';
        break;
      case 'incubadora':
        this.body.incubadora_p = '';
        this.body.incubadora_e = '';
        break;
      case 'pesoMedida':
        this.body.pesoMedida_p = '';
        this.body.pesoMedida_e = '';
        break;
      case 'tamizMetabolico':
        this.body.tamizMetabolico_p = '';
        this.body.tamizMetabolico_e = '';
        break;
      case 'PuntajeAPGAR':
        this.body.PuntajeAPGAR_p = '';
        this.body.PuntajeAPGAR_e = '';
        break;
     
    }
    this.guardar();
  }
  
}
