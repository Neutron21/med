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
    this.pxService.fichamedicaAuxFm(this.body).subscribe((response: any) => {
      console.log("Paciente registrado con éxito, " + response.message);
      console.log("Paciente actual, " , response.data);

    }, (error: any) =>{
      console.log("Error al registrar paciente: " + error.error.error);
    });
  }

  guardar() {
    sessionStorage.setItem('s9', JSON.stringify(this.body));
  }

}
