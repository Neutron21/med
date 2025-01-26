import { Component, OnInit } from '@angular/core';
import { Pediatrico } from 'src/app/models/pediatrico';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s8pediatrico-antperinatales',
  templateUrl: './s8pediatrico-antperinatales.component.html',
  styleUrls: ['./s8pediatrico-antperinatales.component.scss']
})
export class S8pediatricoAntperinatalesComponent implements OnInit {
  showPerinatalesTable = true;
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

  body: Pediatrico = { 
    numEmbarazo_e:'',  
    embarazoMultiple_e:'',  
    alimentacionEmbarazo_e:'',     
    controlPerinatal_e:'',    
    vidaUterina_e:'',   
    partoCesarea_e:'',  
    problemasEmbarazoParto_e:'',  
    traumatismoEmbarazoParto_e:'',    
    maniobrasReanimacion_e:'',  
    incubadora_e:'',    
    pesoMedida_e:'',  
    tamizMetabolico_e:'', 
    PuntajeAPGAR_e:'' 
  }
  initBody = JSON.parse(JSON.stringify(this.body)); 
  idPx: number|null = null;

  constructor( 
    private utilService: UtilService,
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
          this.body = response.length > 0 ? response[0] : this.initBody;
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
    this.formData.numEmbarazoSiNo = Boolean(this.body.numEmbarazo_e);
    this.formData.embarazoMultipleSiNo = Boolean(this.body.embarazoMultiple_e);
    this.formData.alimentacionEmbarazoSiNo = Boolean(this.body.alimentacionEmbarazo_e);
    this.formData.controlPerinatalSiNo = Boolean(this.body.controlPerinatal_e);
    this.formData.vidaUterinaSiNo = Boolean(this.body.vidaUterina_e);
    this.formData.partoCesareaSiNo = Boolean(this.body.partoCesarea_e);
    this.formData.problemasEmbarazoPartoSiNo = Boolean(this.body.problemasEmbarazoParto_e);
    this.formData.traumatismoEmbarazoPartoSiNo = Boolean(this.body.traumatismoEmbarazoParto_e);
    this.formData.maniobrasReanimacionSiNo = Boolean(this.body.maniobrasReanimacion_e);
    this.formData.incubadoraSiNo = Boolean(this.body.incubadora_e);
    this.formData.pesoMedidaSiNo = Boolean(this.body.pesoMedida_e);
    this.formData.tamizMetabolicoSiNo = Boolean(this.body.tamizMetabolico_e);
    this.formData.puntajeApgarSiNo = Boolean(this.body.PuntajeAPGAR_e);
  }
  

  guardar() {
    sessionStorage.setItem('s8', JSON.stringify(this.body));
  }

  limpiar($event: any,id: keyof Pediatrico) {
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
    // TEXT AREA AUTO AJUSTE
   adjustTextareaHeight(id: string): void {
    this.utilService.adjustTextAreaH(id);
  }
  resetTextareaHeight(id: string): void {
    this.utilService.resetTextareaH(id);
  }
  validarAlturaAll() {
    setTimeout( () => { 
      this.utilService.adjustTextAreaH('numEmbarazo_e');
      this.utilService.adjustTextAreaH('embarazoMultiple_e');
      this.utilService.adjustTextAreaH('alimentacionEmbarazo_e');
      this.utilService.adjustTextAreaH('controlPerinatal_e');
      this.utilService.adjustTextAreaH('vidaUterina_e');
      this.utilService.adjustTextAreaH('partoCesarea_e');
      this.utilService.adjustTextAreaH('problemasEmbarazoParto_e');
      this.utilService.adjustTextAreaH('traumatismoEmbarazoParto_e');
      this.utilService.adjustTextAreaH('maniobrasReanimacion_e');
      this.utilService.adjustTextAreaH('incubadora_e');
      this.utilService.adjustTextAreaH('pesoMedida_e');
      this.utilService.adjustTextAreaH('tamizMetabolico_e');
      this.utilService.adjustTextAreaH('PuntajeAPGAR_e');
    }, 0); 
  }
}
