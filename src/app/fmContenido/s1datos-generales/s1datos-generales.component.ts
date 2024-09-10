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
showPhoneError: boolean = false;


  constructor(
    private utilService: UtilService,
    private pxService: PxService

  ) {}

  ngOnInit(): void {

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

validatePhoneNumber(): void {
  if (this.body.tel_contacto_de_emergencia?.length !== 10) {
    this.showPhoneError = true;
  } else {
    this.showPhoneError = false;
  }
}
}
