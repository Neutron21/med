import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-table-px',
  templateUrl: './table-px.component.html',
  styleUrls: ['./table-px.component.scss']
})
export class TablePxComponent implements OnInit {

  buscarPxForm!: FormGroup;

  constructor(
    private utilService: UtilService
  ) { 
    this.buscarPxForm = new FormGroup({
      nombre: new FormControl(null,),
      dx: new FormControl(null, ),
    });
  }

  ngOnInit(): void {
  }
  validateTextInput(event: KeyboardEvent): boolean {
    return this.utilService.onlyText(event);
  }
  buscarPx() {
    const pxControl = this.buscarPxForm.get('nombre');
    const dxControl = this.buscarPxForm.get('dx');
    if (!!pxControl?.value || !!dxControl?.value) {
      console.log(this.buscarPxForm);
    }
    
  }
}
