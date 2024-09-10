import { Component, OnInit } from '@angular/core';
import { PxService } from 'src/app/services/px.service';
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



  constructor( 
    private utilService: UtilService,
    private pxService: PxService


  ) { }

  ngOnInit(): void {
 
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

