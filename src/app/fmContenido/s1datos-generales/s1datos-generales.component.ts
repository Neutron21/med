import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s1datos-generales',
  templateUrl: './s1datos-generales.component.html',
  styleUrls: ['./s1datos-generales.component.scss']
})
export class S1datosGeneralesComponent implements OnInit {
  body= {
    id_paciente: 3,
    escolaridad: "",
    ocupacion: "",
    religion: "",
    nacionalidad: "",
    contacto_de_emergencia: "",
    tel_contacto_de_emergencia: "",
    medico_tratante: "",
    lugar_de_recidencia: "",
    remision: ""
}

  constructor(
    private utilService: UtilService,
    private pxService: PxService

  ) {}

  ngOnInit(): void {
    this.pxService.datosGeneralesPost(this.body).subscribe((response: any) => {
      console.log("Paciente registrado con éxito, " + response.message);
      console.log("Paciente actual, " , response.data);

    }, (error: any) =>{
      console.log("Error al registrar paciente: " + error.error.error);
    });
  }
  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
  onlyNumbers(event: KeyboardEvent): void {
    this.utilService.onlyNumbers(event);

  }
  guardar() {
    sessionStorage.setItem('s1', JSON.stringify(this.body));
  }
}
