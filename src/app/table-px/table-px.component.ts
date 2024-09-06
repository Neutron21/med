import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { PxService } from '../services/px.service';

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
    this.showSpiner = true;
    const pxControl = this.buscarPxForm.get('textoFind');
    if (!!pxControl?.value) {
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
}
