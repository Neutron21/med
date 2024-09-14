import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { PxService } from '../services/px.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-table-px',
  templateUrl: './table-px.component.html',
  styleUrls: ['./table-px.component.scss']
})
export class TablePxComponent implements OnInit {

  buscarPxForm!: FormGroup;
  showSpiner: boolean = false;
  pxList: any = [];

  constructor(
    private utilService: UtilService,
    private pxService: PxService
  ) { 
    this.buscarPxForm = new FormGroup({
      textoFind: new FormControl(null,),
    });
  }

  ngOnInit(): void {
  }
  validateTextInput(event: KeyboardEvent): boolean {
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
    console.log(idPx);
    const modalElement = document.getElementById('fichaModalTable');
    const modal = new Modal(modalElement!);
    modal.show();
  }
}
