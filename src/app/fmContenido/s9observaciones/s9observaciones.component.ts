import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';

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
            this.authService.getById('fichaMedicaAux','id_paciente', currentPxId).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.body;

        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }

  guardar() {
    sessionStorage.setItem('s9', JSON.stringify(this.body));
  }

  limpiar($event: any,id: string) {
    console.log($event);
    switch (id) {
      case 'motivoConsulta':
        this.body.motivoConsulta = '';
        break;
      case 'diagnosticoMedico':
        this.body.diagnosticoMedico = '';
        break;
      case 'mecanismoLesion':
        this.body.mecanismoLesion = '';
        break;
      case 'tratamientosPrevios':
        this.body.tratamientosPrevios = '';
        break;
      case 'observaciones':
        this.body.observaciones = '';
        break;
    }
    this.guardar();
  }
}
  

