import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';

@Component({
  selector: 'app-s7mujer-ant-gine-obt',
  templateUrl: './s7mujer-ant-gine-obt.component.html',
  styleUrls: ['./s7mujer-ant-gine-obt.component.scss']
})
export class S7mujerAntGineObtComponent implements OnInit {
  formData: any = {};
  showTable = false;
  body = {
      mecarca_p:'', 
      mecarca_e:'',
      dismenorreas_p:'', 
      dismenorreas_e:'',
      gestaActual_p:'',
      gestaActual_e:'',
      numeroGestas_p:'', 
      numeroGestas_e:'',
      numeroPartos_p:'', 
      numeroPartos_e:'',
      cesareas_p:'', 
      cesareas_e:'',
      aborto_p:'', 
      aborto_e:'',
      nacidosVivos_p:'', 
      nacidosVivos_e:'',
      menopausia_p:'', 
      menopausia_e:''
  }


  constructor( 
    private pxService: PxService

  ) { }
  ngOnInit(): void {
    this.pxService.mujerFm(this.body).subscribe((response: any) => {
      console.log("Paciente registrado con éxito, " + response.message);
      console.log("Paciente actual, " , response.data);

    }, (error: any) =>{
      console.log("Error al registrar paciente: " + error.error.error);
    });
  }

  guardar() {
    sessionStorage.setItem('s7', JSON.stringify(this.body));
  }
}
