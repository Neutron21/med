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
    // this.pxService.deportivoFm(this.body).subscribe((response: any) => {
    //   console.log("Paciente registrado con éxito, " + response.message);
    //   console.log("Paciente actual, " , response.data);

    // }, (error: any) =>{
    //   console.log("Error al registrar paciente: " + error.error.error);
    // });
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

