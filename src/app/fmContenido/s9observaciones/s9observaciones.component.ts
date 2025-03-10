import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

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
    observaciones: '',
    tratamiento: ""
  }
  initBody = JSON.parse(JSON.stringify(this.body)); 
  idPx: number|null = null;

  

  constructor( 
    private utilService: UtilService,
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
          console.log('S9 Datos del paciente:', response);
          this.body = response.length > 0 ? response[0] : this.initBody;
          this.validarAlturaAll();
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
   // TEXT AREA AUTO AJUSTE
   adjustTextareaHeight(id: string): void {
    this.utilService.adjustTextAreaH(id);
  }
  resetTextareaHeight(id: string): void {
    this.utilService.resetTextareaH(id);
  }
  validarAlturaAll() {
    console.log("validarAlturaAll()");
    
    setTimeout( () => { 
      this.utilService.adjustTextAreaH('motivoConsulta');
      this.utilService.adjustTextAreaH('diagnosticoMedico');
      this.utilService.adjustTextAreaH('mecanismoLesion');
      this.utilService.adjustTextAreaH('tratamientosPrevios');
      this.utilService.adjustTextAreaH('observaciones');
    }, 500); 
  }
}
  

