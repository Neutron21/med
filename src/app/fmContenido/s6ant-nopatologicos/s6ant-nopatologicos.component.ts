import { Component, OnInit } from '@angular/core';
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
    private pxService: PxService

  ) { }
  ngOnInit(): void {
    this.pxService.antecedentesNoPatFm(this.body).subscribe((response: any) => {
      console.log("Paciente registrado con éxito, " + response.message);
      console.log("Paciente actual, " , response.data);

    }, (error: any) =>{
      console.log("Error al registrar paciente: " + error.error.error);
    });
  }

  guardar() {
    sessionStorage.setItem('s6', JSON.stringify(this.body));
  }

}