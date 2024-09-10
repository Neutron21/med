import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';

@Component({
  selector: 'app-s9observaciones',
  templateUrl: './s9observaciones.component.html',
  styleUrls: ['./s9observaciones.component.scss']
})
export class S9observacionesComponent implements OnInit {

  body = {
    motivoConsulta:'',
    diagnosticoMedico: '',
    mecanismoLesion: '',
    tratamientosPrevios: '',
    observaciones: ''
  }

  constructor( 
    private pxService: PxService

  ) { }
  ngOnInit(): void {
  
  }

  guardar() {
    sessionStorage.setItem('s9', JSON.stringify(this.body));
  }

}
