import { Component, OnInit } from '@angular/core';
import { Pediatrico } from 'src/app/models/pediatrico';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';

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
      this.adjustTextareaHeight('numEmbarazo_e');
      this.adjustTextareaHeight('embarazoMultiple_e');
      this.adjustTextareaHeight('alimentacionEmbarazo_e');
      this.adjustTextareaHeight('controlPerinatal_e');
      this.adjustTextareaHeight('vidaUterina_e');
      this.adjustTextareaHeight('partoCesarea_e');
      this.adjustTextareaHeight('problemasEmbarazoParto_e');
      this.adjustTextareaHeight('traumatismoEmbarazoParto_e');
      this.adjustTextareaHeight('maniobrasReanimacion_e');
      this.adjustTextareaHeight('incubadora_e');
      this.adjustTextareaHeight('pesoMedida_e');
      this.adjustTextareaHeight('tamizMetabolico_e');
      this.adjustTextareaHeight('PuntajeAPGAR_e');
    }, 0); 
  }
}
