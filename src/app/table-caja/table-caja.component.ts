import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-caja',
  templateUrl: './table-caja.component.html',
  styleUrls: ['./table-caja.component.scss']
})
export class TableCajaComponent implements OnInit {

  buscarPagoForm: FormGroup;
  constructor() { 
    this.buscarPagoForm = new FormGroup({
      desde: new FormControl(null,Validators.required),
      hasta: new FormControl(null, Validators.required),
      tipo: new FormControl(null, ),
    });
  }

  ngOnInit(): void {
  }
  buscarPago() {
    const desdeControl = this.buscarPagoForm.get('desde');
    const hastaControl = this.buscarPagoForm.get('hasta');
    const tipoControl = this.buscarPagoForm.get('tipo');
    if (!!desdeControl?.value || !!hastaControl?.value) {
      console.log(this.buscarPagoForm);
    }
    
  }
}
