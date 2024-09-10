import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';

@Component({
  selector: 'app-s5ant-patologicos',
  templateUrl: './s5ant-patologicos.component.html',
  styleUrls: ['./s5ant-patologicos.component.scss']
})
export class S5antPatologicosComponent implements OnInit {
  formData: any = {};
  body = {
	diabetes_p: '',
  diabetes_e: '',
  alergias_p: '',
  alergias_e: '',
  accidentes_p: '',
  accidentes_e: '',
  neoplasias_p: '',
  neoplasias_e: '',
  cardiopatias_p: '',
  cardiopatias_e: '',
  cirugias_p: '',
  cirugias_e: '',
  respiratorias_p: '',
  respiratorias_e: '',
  dolor_cabeza_p: '',
  dolor_cabeza_e: '',
  malformaciones_congenitas_p: '',
  malformaciones_congenitas_e: '',
  neurologicas_p: '',
  neurologicas_e: '',
  convulsiones_epilepsias_p: '',
  convulsiones_epilepsias_e: '',
  traumatismos_p: '',
  traumatismos_e: ''

}

  constructor( 
    private pxService: PxService

  ) { }
  ngOnInit(): void {
 
  }

  guardar() {
    sessionStorage.setItem('s5', JSON.stringify(this.body));
  }

}