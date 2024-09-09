import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';

@Component({
  selector: 'app-s8pediatrico-antperinatales',
  templateUrl: './s8pediatrico-antperinatales.component.html',
  styleUrls: ['./s8pediatrico-antperinatales.component.scss']
})
export class S8pediatricoAntperinatalesComponent implements OnInit {
  formData: any = {};
  showPerinatalesTable = false;

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
  


  constructor( 
    private pxService: PxService

  ) { }
  ngOnInit(): void {
    this.pxService.pediatricoFm(this.body).subscribe((response: any) => {
      console.log("Paciente registrado con éxito, " + response.message);
      console.log("Paciente actual, " , response.data);

    }, (error: any) =>{
      console.log("Error al registrar paciente: " + error.error.error);
    });
  }

  guardar() {
    sessionStorage.setItem('s8', JSON.stringify(this.body));
  }

}
