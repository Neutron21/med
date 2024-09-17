import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { PxService } from '../services/px.service';
import { Modal } from 'bootstrap';
import { SharedDataService } from '../services/shared.service';

@Component({
  selector: 'app-table-px',
  templateUrl: './table-px.component.html',
  styleUrls: ['./table-px.component.scss']
})
export class TablePxComponent implements OnInit {

  buscarPxForm!: FormGroup;
  showSpiner: boolean = false;
  pxList: any = [];
  nameToShow: string = '';

  constructor(
    private utilService: UtilService,
    private pxService: PxService,
    private sharedDataService: SharedDataService
  ) { 
    this.buscarPxForm = new FormGroup({
      textoFind: new FormControl(null,),
    });
  }

  ngOnInit(): void {
  }
  validateTextInput(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 13) {
      this.buscarPx();
    }
    return this.utilService.onlyText(event);
  }
  buscarPx() {
    const pxControl = this.buscarPxForm.get('textoFind');
    if (!!pxControl?.value) {
      this.showSpiner = true;
      console.log(pxControl);
      this.pxService.getPacientes(pxControl.value).subscribe(
        (response) => {
          console.log('Pacientes:', response);
          this.pxList = response;
          this.showSpiner = false;
        },(error) => {
          console.error('Error al obtener los datos del usuario:', error);
          this.showSpiner = false;
        });
    }
    
  }
  openFichaMedica(idPx: number){
    sessionStorage.setItem('currentPxId', idPx.toString());
    this.upDateIdPaciente(idPx)
    const modalElement = document.getElementById('fichaModalTable');
    const modal = new Modal(modalElement!);
    const pxToShow = this.pxList.find((el: { id: number; }) => idPx == el.id);
    this.nameToShow = `${pxToShow.nombre} ${pxToShow.apellido_p} ${pxToShow.apellido_m}`
    console.log(this.nameToShow);
    
    modal.show();

  }
  upDateIdPaciente(id:number) {
    console.log(id);
    this.sharedDataService.cambiarIdPaciente(id);
  }
  resetModal() {
    const currSec = sessionStorage.getItem('currentSection');
    this.sharedDataService.seccionesCompletadas(currSec);
    sessionStorage.removeItem('s1');
    sessionStorage.removeItem('s2');
    sessionStorage.removeItem('s3');
    sessionStorage.removeItem('s4');
    sessionStorage.removeItem('s4');
    sessionStorage.removeItem('s5');
    sessionStorage.removeItem('s6');
    sessionStorage.removeItem('s7');
    sessionStorage.removeItem('s8');
    sessionStorage.removeItem('s9');
  }
}
