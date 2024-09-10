import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';

@Component({
  selector: 'app-s4ant-hfamiliares',
  templateUrl: './s4ant-hfamiliares.component.html',
  styleUrls: ['./s4ant-hfamiliares.component.scss']
})
export class S4antHfamiliaresComponent implements OnInit {
  formData: any = {};
  body= {
      diabetes_p: "",
      diabetes_e: "",
      alergias_p: "",
      alergias_e: "",
      accidentes_p: "",
      accidentes_e: "",
      neoplasias_p: "",
      neoplasias_e: "",
      cardiopatias_p: "",
      cardiopatias_e: "",
      cirugias_p: "",
      cirugias_e: "",
      respiratorias_p: "",
      respiratorias_e: "",
      dolor_de_cabeza_p: "",
      dolor_de_cabeza_e: "",
      malformaciones_geneticas_p: "",
      malformaciones_geneticas_e: "",
      neourologicas_p: "",
      neourologicas_e: "",
      convulsiones_epilepsia_p: "",
      convulsiones_epilepsia_e: "",
      traumatismos_p: "",
      traumatismos_e: "",
      enfermedades_infecciosas_p: "",
      enfermedades_infecciosas_e: "",
      reumaticas_p: "",
      reumaticas_e: "",
      hospitalizaciones_previas_p: "",
      hospitalizaciones_previas_e: "",
      otras_p: "",
      otras_e: ""
  }

  constructor( 
    private pxService: PxService

  ) { }
  ngOnInit(): void {
    
  }

  guardar() {
    sessionStorage.setItem('s4', JSON.stringify(this.body));
  }

}
