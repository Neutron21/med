import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PxService } from 'src/app/services/px.service';
import { SharedDataService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-s2px-deportivo',
  templateUrl: './s2px-deportivo.component.html',
  styleUrls: ['./s2px-deportivo.component.scss']
})
export class S2pxDeportivoComponent implements OnInit {
  formData: any = {};
  body= {
    disciplina: "",
    deporte_de_alto_rendimiento: "",
    arte_competitivo: "",
    categoria: "",
    nombre_del_entrenador: "",
    club_o_liga_deportiva: ""
  }
  initBody = JSON.parse(JSON.stringify(this.body)); 
  idPx: number|null = null;
  isLoading: boolean = false;

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
            this.authService.getById('deportivoFm','id_paciente', currentPxId).subscribe(
        (response) => {
          console.log('Datos del paciente:', response);
          if (response.length > 0) {
            this.body = response.length > 0 ? response[0] : this.initBody;
          }
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
        }
      );
    } else {
      console.warn('No se encontró el ID del paciente en sessionStorage');
    }
  }
  onlyText(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
  onlyNumbers(event: KeyboardEvent): void {
    this.utilService.onlyNumbers(event);

  }
  guardar() {
    sessionStorage.setItem('s2', JSON.stringify(this.body));
  }

}

